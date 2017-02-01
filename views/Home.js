import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, AlertIOS, View, ScrollView, Linking} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Title, Content, Card, CardItem, Thumbnail, Icon, Button, Text, Spinner, List, ListItem, H3 } from 'native-base';

import Modal from 'react-native-modalbox';
import Api from '../src/api.js';
import axios from 'axios';
var moviesList = [];
var BASE_URL = 'https://yts.ag/api/v2/list_movies.json';
var window = require('Dimensions').get('window');
var {height, width} = require('Dimensions').get('window');

class Home extends Component {
    constructor(props) {
    	super(props);
    	this.state = {moviesList: '', selectedMovie: '', isLoading: true, isOpen: false, swipeToClose: true, isDisabled: false, sliderValue: 0.3};
    }
    
	componentDidMount() {
        var _this = this;
		axios.get(BASE_URL)
        .then(function(response) {
          var obj = response.data.data;                     
          for(var i = 0; i < obj.movies.length; i++) {            
            moviesList[i] = {
              "title": obj.movies[i].title,
              "summary": (obj.movies[i].summary),
              "thumbnail": (obj.movies[i].small_cover_image).replace(/\\/g, ""),
              "modalImage": (obj.movies[i].medium_cover_image).replace(/\\/g, ""),              
              "year": obj.movies[i].year,
              "genres": obj.movies[i].genres,
              "rating": obj.movies[i].rating,
              "language": obj.movies[i].language,
              "imdbCode": obj.movies[i].imdb_code
            };
        }
        _this.setState({moviesList: moviesList, isLoading: false});
      })
      .catch(function(error) {
        console.error(error);
      });
	}
  
    toggleSwipeToClose() {
        this.setState({swipeToClose: !this.state.swipeToClose});
    }
  
    _onPressMovieItem(movieItem) {
          var movieItem = movieItem;
          this.setState({selectedMovie: movieItem});
          this.refs.modal1.open();
    }
  
    _closeModal() {
          this.refs.modal1.close();        
    }

	render() {        
        if(this.state.isLoading) {
            return this.renderLoadingView();
        }
		return (
            <View>
			<ScrollView>
	            <List dataArray={this.state.moviesList}
                      renderRow={(item) => 
                      <ListItem button style={styles.movieItem} onPress={(movieItem) => this._onPressMovieItem(item)}>
                        <Thumbnail square size={80} source={{uri: item.thumbnail}} />
                        <Text style={styles.movieName}>{item.title}</Text>
                        <Text note>{item.summary.substring(0,200)}...</Text>
                      </ListItem>
                }>                  
                </List>
                 <Modal style={styles.modalStyle} ref={"modal1"} position={'top'} swipeToClose={this.state.swipeToClose}>
                     <View>
                         <ScrollView centerContent={true}>
                         <Grid>
                              <Row style={{paddingTop: 10}}>
                                  <Col size={85}>
                                      <H3 style={styles.modalTitle}>{this.state.selectedMovie == '' ? '': this.state.selectedMovie.title}</H3>
                                  </Col>
                                  <Col size={15}>
                                      <Button onPress={() => this._closeModal()} transparent style={{marginRight: 0}}>                                        			                           
                                          <Icon name='ios-close-outline' style={{fontSize: 35, color: '#ffffff'}} />
                                      </Button>
                                  </Col>
                              </Row>
                             <Row style={{padding: 10}}>
                                 <View>
                                     <Thumbnail square style={{width: width - 20, height: 150}} source={{uri: this.state.selectedMovie.modalImage}} />
                                 </View>
                             </Row>  
                             <Row style={{padding: 10}}>
                                 <Col>
                                     <Text style={{color: '#ffffff'}}>Released in {this.state.selectedMovie.year}</Text>
                                 </Col>                                 
                                 <Col>
                                     <Text style={{color: '#ffffff'}}>Language - {this.state.selectedMovie.language}</Text>
                                 </Col>                                                                
                             </Row>
                             <Row style={{padding: 10}}>
                                 <Text style={{color: '#ffffff'}}>Rating - {this.state.selectedMovie.rating}</Text>
                             </Row>
                             <Row style={{padding: 10}}>
                                 <Text style={{color: '#ffffff'}}>{this.state.selectedMovie.summary}</Text>
                             </Row>
                             <Row style={{padding: 10}}>
                                 <Text style={{color: '#3c65b9'}} onPress={() => Linking.openURL('http://www.imdb.com/title/' + this.state.selectedMovie.imdbCode)}>IMDB Link</Text>
                             </Row>
                         </Grid>
                       </ScrollView>
                   </View>
                </Modal>
            </ScrollView>
          </View>
		);
	}
  
    renderLoadingView() {
        return (          
            <View style={styles.loading}>
                <Image source={require('../img/movies_graphic.gif')} />
            </View>          
        )
    }
}

const styles = StyleSheet.create({
	txtcenter: {
		textAlign: 'center'
	},
    modalStyle: {
        backgroundColor: '#191916', 
        flex: 1,
        flexDirection: 'column',
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
    movieName: {
        color: '#ffffff'
    },
    movieItem: {
        marginLeft: 0, 
        paddingLeft: 10,
        paddingTop: 7,
        paddingRight: 7,
        paddingBottom: 7
    },
    modal: {
    },
});

module.exports = Home;