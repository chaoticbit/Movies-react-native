/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, StatusBar, View } from 'react-native';
import { Container, Header, Title, InputGroup, Input, Content, Footer, FooterTab, Icon, Button, Text, Badge } from 'native-base';
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
            		<Button active={this.state.screen == 0} onPress={() => this.switchScreen(0)}>                                        			
                        Home
                        <Icon name='ios-home' />
                    </Button>
            		<Button active={this.state.screen == 1} onPress={() => this.switchScreen(1)}>                            
                        Categories
                        <Icon name='ios-apps' />
                    </Button>
            	</FooterTab>
            </Footer>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
      headbarNotFocused: {
          paddingHorizontal: 0
      },
      searchInputGroup: {
          backgroundColor: '#191916',
          borderWidth: 0
      },
      searchInputGroupFocused: {
          backgroundColor: '#555555',
          borderWidth: 0            
      }
});

AppRegistry.registerComponent('Movies', () => Movies);
