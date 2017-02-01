import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView } from 'react-native';
// import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Title, Content, Icon, Button, Text, List, ListItem, InputGroup, Input } from 'native-base';

class Search extends Component {
    
    constructor(props) {
        super(props);
    }
  
    render () {
        var genreList = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
                        'History', 'Horror', 'Music', 'Mystery', 'News', 'Reality-TV', 'Romance', 'Sci-Fi', 'Sport', 'Talk-Show', 'Thriller', 'War'];
      
        return (
            <View>
                <InputGroup>
                   <Icon name='ios-search' style={styles.searchInputIcon}/>
                   <Input placeholder='Search movies, series, episodes' style={{color: '#ffffff'}} />
                </InputGroup>      
                <ScrollView>
                    <List dataArray={genreList}
                        renderRow={(item) => 
                        <ListItem style={styles.categoryItem} button>
                            <Text style={{color: '#fff'}}>{item}</Text>
                        </ListItem>
                  }>   
                  </List>
                </ScrollView>                
            </View>
            )
    }
}

const styles = StyleSheet.create({
    searchInputIcon: {
      color:'#fcfcfc', 
      fontSize: 20, 
      paddingLeft: 10, 
      paddingTop: 5
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