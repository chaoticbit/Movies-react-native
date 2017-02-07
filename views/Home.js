import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, AlertIOS, View, ScrollView, Linking, WebView} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Title, Content, Card, CardItem, Thumbnail, Icon, Button, Text, Spinner, List, ListItem, H3 } from 'native-base';

import Modal from 'react-native-modalbox';
// import Modal from 'react-native-simple-modal';
import Api from '../src/api.js';
import axios from 'axios';

var moviesList = [];
var BASE_URL = 'https://yts.ag/api/v2/list_movies.json';
var window = require('Dimensions').get('window');
var {height, width} = require('Dimensions').get('window');

class Home extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
          moviesList: '', 
          selectedMovie: '', 
          isLoading: true, 
          isLoadingModal: false,
          webViewInitiated: false, 
          isOpen: false, 
          swipeToClose: true, 
          isDisabled: false,
          sliderValue: 0.3,
          page: 1
        };
        this.reloadData = this.reloadData.bind(this);
        this._onPressMovieItem = this._onPressMovieItem.bind(this);
    }
    
	componentDidMount() {
        setTimeout(this.reloadData, 2000);
	}
    
    reloadData() {
        Api.getUpcomingMovies(this.state.page)
          .then((data) => {
              moviesList = data;
              this.setState({moviesList: moviesList, isLoading: false});
        });
    }
  
    toggleSwipeToClose() {
        this.setState({swipeToClose: !this.state.swipeToClose});
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

	render() {        
        if(this.state.isLoading) {
            return this.renderLoadingView();
        }
        if(this.state.isLoadingModal) {
            return this.renderModalLoadingView();
        }
		return (
            <View style={{paddingBottom: 120, position: 'absolute', height: height, top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'column', flex: 1}}>            
            <ScrollView ref={"listScrollView"}>
	            <List dataArray={this.state.moviesList}
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
		);
	}
  
    renderIMDBLinkView() {
        return (
          <View>
            <WebView
                source={{uri: 'http://www.imdb.com/title/' + this.state.selectedMovie.imdbCode}}
                style={{marginTop: 20}}
            />
          </View>
        )
    }
  
    renderLoadingView() {
        return (          
            <View style={styles.loading}>
                <Image source={require('../img/movies_graphic.gif')} />
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
    },
    modal: {
    },
});

module.exports = Home;