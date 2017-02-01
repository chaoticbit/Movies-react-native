/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, StatusBar, View } from 'react-native';
import { Container, Header, Title, Content, Tabs, Footer, FooterTab, Icon, Button, Text, Badge } from 'native-base';
import lightTheme from './Themes/light'
import Home from './views/Home'
import Categories from './views/Categories'

export default class Movies extends Component {
  
  constructor(props) {
    	super(props);
    	this.state = {screen: 0};
  }

  switchScreen(index) {
  		this.setState({screen: index})
  }	

  render() {

  	let AppComponent = Home;

  	if(this.state.screen == 0) {
  		AppComponent = Home
  	} else {
  		AppComponent = Categories
  	}

    return (
        <Container theme={lightTheme} style={{backgroundColor: '#191916'}}>
            <View>
            <StatusBar 
              barStyle='light-content'
            />
            </View>
            <Header inverse>            	
            	<Title>Movies</Title>
            </Header>            	
            <Content> 
            	<AppComponent/> 
            </Content>
            <Footer theme={lightTheme}>
            	<FooterTab>
            		<Button onPress={() => this.switchScreen(0)}>                                        			
                        Home
                        <Icon name='ios-home' />
                    </Button>
            		<Button onPress={() => this.switchScreen(1)}>                            
                        Categories
                        <Icon name='ios-apps' />
                    </Button>
            	</FooterTab>
            </Footer>
        </Container>
    );
  }
}

AppRegistry.registerComponent('Movies', () => Movies);
