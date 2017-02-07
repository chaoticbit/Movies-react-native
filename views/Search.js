import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, AlertIOS, Linking, ActivityIndicatorIOS } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Modal from 'react-native-modalbox';
import { Container, Title, Content, Icon, Button, Text, List, ListItem, InputGroup, Input, Thumbnail, H3 } from 'native-base';
import axios from 'axios';

var {height, width} = require('Dimensions').get('window');
var moviesList = [];
var SEARCH_URL = 'https://www.omdbapi.com/?s=';
var GET_MOVIE_INFO_URL = 'https://www.omdbapi.com/?i=';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            searchResults: '',
            isLoading: false,
            selectedMovie: ''
        }
    }
  
    onKeyUpSearch(key) {
        if(key == '') {
            this.setState({searchKey: '', searchResults: '', isLoading: false});
        }
        this.setState({searchKey: key, isLoading: true});        
        var _this = this;
		axios.get(SEARCH_URL + key + '&type=movie')
        .then(function(response) {
          var obj = response.data;    
          if(obj.Search) {
              for(var i = 0; i < obj.Search.length; i++) {            
                moviesList[i] = {
                  "title": obj.Search[i].Title,
                  "thumbnail": obj.Search[i].Poster,
                  "year": obj.Search[i].Year,
                  "imdbCode": obj.Search[i].imdbID
                };
            }
            _this.setState({searchResults: moviesList, isLoading: false});
         }
      })       
    }
  
    _onPressMovieItem(item) {
        var imdbID = item.imdbCode;
        
        var _this = this;
        axios.get(GET_MOVIE_INFO_URL + imdbID + '&tomatoes=true')
        .then(function(response) {
            var movieItem = response.data;
            _this.setState({selectedMovie: movieItem});
            _this.refs.modal1.open();
        })
      
    }
  
    _closeModal() {
        this.refs.modal1.close();        
    }
  
    render () {           
        
      if(this.state.searchKey!== '') {
          var ClearTextComponent = (<Icon name='ios-close-circle' onPress={() => this.setState({searchKey: '', searchResults: ''})} style={styles.searchInputIcon}/>)
      }

        return (
            <View style={{paddingBottom: 120, position: 'absolute', height: height, top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'column', flex: 1}}>
                <InputGroup style={{position: 'absolute'}}>
                   <Icon name='ios-search' style={styles.searchInputIcon}/>
                   <Input placeholder='Search movies, series, episodes' style={{color: '#ffffff'}} value={this.state.searchKey} onChangeText={(text) => this.onKeyUpSearch(text)} />
                  {ClearTextComponent}
                </InputGroup>      
                <ScrollView style={{marginTop: 50}}>
                    <List dataArray={this.state.searchResults}
                        renderRow={(item) => 
                      <ListItem button style={styles.movieItem} onPress={(movieItem) => this._onPressMovieItem(item)}>
                        <Thumbnail square size={70} source={{uri: item.thumbnail}} />
                        <Text style={styles.movieName}>{item.title}</Text>
                        <Text note style={{width: 110}}>Released on {item.year}</Text>
                        <Text style={{color: '#3c65b9', width: 100}} onPress={() => Linking.openURL('http://www.imdb.com/title/' + item.imdbCode)}>IMDB Link</Text>
                      </ListItem>
                  }>   
                  </List>
                </ScrollView>  
                <Modal style={styles.modalStyle} ref={"modal1"} position={'top'}>                      
                <ScrollView ref={"modalScrollView"}>
                  <Grid>
                    <Row style={{paddingTop: 10}}>
                      <Col size={85}>
                        <H3 style={styles.modalTitle}>{this.state.selectedMovie.Title}</H3>
                      </Col>
                      <Col size={15}>
                        <Button onPress={() => this._closeModal()} transparent style={{marginRight: 0}}>                                        			                           
                          <Icon name='ios-close-outline' style={{fontSize: 35, color: '#ffffff'}} />
                        </Button>
                      </Col>
                    </Row>
                    <Row style={{paddingTop: 5, paddingHorizontal: 10}}>
                      <Col size={30}>
                        <Thumbnail square size={80} source={{uri: this.state.selectedMovie.Poster}} />
                      </Col>
                      <Col size={70}>
                          <Text note style={{color: '#ffffff'}}>Released on {this.state.selectedMovie.Released}</Text>
                          <Text note style={{color: '#ffffff'}}>Runtime - {this.state.selectedMovie.Runtime}</Text>
                          <Text note style={{color: '#ffffff'}}>IMDB Rating - {this.state.selectedMovie.imdbRating}</Text>
                      </Col>
                    </Row>  
                    <Row style={{paddingTop: 5, paddingHorizontal: 10}}>
                        <Text style={{color: '#ffffff'}}>Actors - {this.state.selectedMovie.Actors}</Text>                                                                                           
                    </Row>
                    <Row style={{paddingTop: 5, paddingHorizontal: 10}}>
                      <Text style={{color: '#ffffff'}}>Genre - {this.state.selectedMovie.Genre}</Text>
                    </Row>
                    <Row style={{paddingTop: 5, paddingHorizontal: 10}}>
                      <Text style={{color: '#ffffff'}}>{this.state.selectedMovie.Plot}</Text>
                    </Row>                    
                  </Grid>
                </ScrollView>
                </Modal>
            </View>
            )
    }
  
    /*renderLoadingView() {
        return (
            <View>
            <ActivityIndicatorIOS
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              animating={true}
              size={'small'}
              color={'white'}
            />
          </View>
        )
    }*/
}

const styles = StyleSheet.create({
    searchInputIcon: {
      color:'#333333', 
      fontSize: 20, 
      paddingLeft: 10, 
      paddingTop: 5
    },
    txtcenter: {
		textAlign: 'center'
	},
    modalTitle: {
        marginLeft: 10,
        marginTop: 5,
        color: '#ffffff'
    },
    modalStyle: {
        backgroundColor: 'rgb(28,48,64)',         
        alignItems: 'center',   
        flex: 1,
        overflow: 'hidden'
    },
    movieName: {
        color: '#ffffff'
    },
    movieItem: {
        marginLeft: 0, 
        paddingLeft: 10,
        paddingTop: 7,
        paddingRight: 7,
        paddingBottom: 7,
    },
    categoryItem: {
        marginLeft: 0, 
        paddingLeft: 20,
        paddingTop: 15,
        paddingRight: 10,
        paddingBottom: 15
    }
});

module.exports = Search;