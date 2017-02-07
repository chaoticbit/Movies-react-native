import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image, ScrollView, AlertIOS, Linking, ActivityIndicatorIOS } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Modal from 'react-native-modalbox';
import { Container, Title, Content, Icon, Button, Text, List, ListItem, InputGroup, Input, Thumbnail, H3 } from 'native-base';
import axios from 'axios';
import Api from '../src/api.js';

var {height, width} = require('Dimensions').get('window');
var moviesList = [];

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            searchResults: '',
            isSearching: false,
            isLoadingModal: false,
            selectedMovie: '',
            page: 1
        }        
    }
  
    onKeyUpSearch(key) {
        if(key == '') {
            this.setState({searchKey: '', searchResults: '', isSearching: false});
        }      
        this.setState({searchKey: key, isSearching: true});        
        var _this = this;            
        Api.getSearchResults(key)
          .then((data) => {
              if(data.length > 0) {
                  _this.setState({searchResults: data, isSearching: false});
              }
          });		     
    }
  
    _onPressMovieItem(movieItem) {
        this.setState({isLoadingModal: true});
        Api.getMovieDetails(movieItem.id)
          .then((data) => {
              this.setState({selectedMovie: data, isLoadingModal: false});
              this.refs.modal1.open();
        });   
    }
  
    _closeModal() {
        this.refs.modal1.close();        
    }
  
    render () {           
        
      if(this.state.searchKey!== '') {
          var ClearTextComponent = (<Icon name='ios-close-circle' onPress={() => this.setState({searchKey: '', searchResults: ''})} style={styles.searchInputIcon}/>)
      }
//       if(this.state.isSearching) {
//           return this.renderIsSearchingView();          
//       }
      if(this.state.isLoadingModal) {
          return this.renderModalLoadingView();
      }

        return (
            <View style={{paddingBottom: 120, position: 'absolute', height: height, top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'column', flex: 1}}>
                <InputGroup style={{position: 'absolute'}}>
                   <Icon name='ios-search' style={styles.searchInputIcon}/>
                   <Input ref={'searchInput'} placeholder='Search movies, series, episodes' style={{color: '#333333'}} value={this.state.searchKey} onChangeText={(text) => this.onKeyUpSearch(text)} />
                  {ClearTextComponent}
                </InputGroup>      
                <ScrollView style={{marginTop: 50}}>
                    <List dataArray={this.state.searchResults}
                      renderRow={(item) => 
                      <ListItem button style={styles.movieItem} onPress={(movieItem) => this._onPressMovieItem(item)}>
                        <Thumbnail square size={80} style={{height: 100}} source={{uri: "https://image.tmdb.org/t/p/w185" + item.poster_path}} />
                        <Text style={styles.movieName}>{item.title}</Text>
                        <Text note style={{color: '#333333'}}>{item.overview.substring(0,130)}...</Text>
                      </ListItem>
                }>                  
                </List>  
                </ScrollView>  
                <Modal style={styles.modalStyle} ref={"modal1"} position={'top'} swipeToClose={this.state.swipeToClose}>                      
                <ScrollView ref={"modalScrollView"}>
                  <Grid>
                    <Row style={{paddingTop: 10}}>
                      <Col size={85}>
                        <H3 style={styles.modalTitle}>{this.state.selectedMovie == '' ? '': this.state.selectedMovie.title}</H3>
                        <Text note style={{fontStyle: 'italic', color: '#cccccc',paddingHorizontal: 20}}>{this.state.selectedMovie.tagline}</Text>
                      </Col>
                      <Col size={15}>
                        <Button onPress={() => this._closeModal()} transparent style={{marginRight: 0}}>                                        			                           
                          <Icon name='ios-close-outline' style={{fontSize: 35, color: '#ffffff'}} />
                        </Button>
                      </Col>
                    </Row>
                    <Row style={{padding: 10, paddingHorizontal: 20}}>
                      <View>
                        <Thumbnail square style={{width: width - 40, height: 150}} source={{uri: "https://image.tmdb.org/t/p/w185" + this.state.selectedMovie.backdrop_path}} />
                      </View>
                    </Row>  
                    <Row style={{padding: 10, paddingHorizontal: 20}}>
                      <Col>
                        <Text style={{color: '#ffffff'}}>Released in {this.state.selectedMovie.release_date}</Text>
                      </Col>                                 
                      <Col>
                        <Text style={{color: '#ffffff', textAlign: 'right'}}>Language - {this.state.selectedMovie.original_language}</Text>
                      </Col>                                                                
                    </Row>
                    <Row style={{padding: 10, paddingHorizontal: 20}}>
                      <Col>
                          <Text style={{color: '#ffffff'}}>Vote average - {this.state.selectedMovie.vote_average}</Text>
                      </Col>                      
                      <Col>
                          <Text style={{color: '#ffffff'}}>Runtime - {this.state.selectedMovie.runtime} minutes</Text>
                      </Col>
                    </Row>
                    <Row style={{padding: 10, paddingHorizontal: 20}}>
                      <Text style={{color: '#ffffff'}}>{this.state.selectedMovie.overview}</Text>
                    </Row>
                    <Row style={{padding: 10, paddingHorizontal: 20}}>
                      <Text style={{color: '#3c65b9'}} onPress={() => Linking.openURL('http://www.imdb.com/title/' + this.state.selectedMovie.imdb_id)}>IMDB Link</Text>
                    </Row>
                  </Grid>
                </ScrollView>
                </Modal>
            </View>
            )
    }    
  
    renderModalLoadingView() {
        return (
            <View style={styles.modalLoading}>
                <Image source={require('../img/video_camera_loader.gif')} style={{marginTop: -150}} />
            </View>          
        )
    }      
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
    modalStyle: {
        backgroundColor: 'rgb(28,48,64)',         
        alignItems: 'center',   
        height: height,
        flex: 1,
        overflow: 'hidden'
    },
    modalTitle: {
        marginLeft: 20,
        marginTop: 5,
        color: '#ffffff'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(170,208,197,0.9)',
        height: height
    },
    movieName: {
        color: '#333333'
    },
    movieItem: {
        marginLeft: 0, 
        paddingLeft: 10,
        paddingTop: 7,
        paddingRight: 7,
        paddingBottom: 7,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5
    }
});

module.exports = Search;