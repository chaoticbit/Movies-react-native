import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView } from 'react-native';
import { Container, Title, Content, Icon, Button, Text, List, ListItem } from 'native-base';

class Categories extends Component {
  
    constructor(props) {
        super(props);
    }
  
	render() {
                
        var genreList = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];
		return (		
            <View style={{marginBottom: -50}}>
              <ScrollView>
                <List dataArray={genreList}
                      renderRow={(item) => 
                      <ListItem style={styles.categoryItem} button>
                          <Text style={{color: '#333333'}}>{item.name}</Text>
                      </ListItem>
                }>   
                </List>
            </ScrollView>
          </View>
		);
	}
}

const styles = StyleSheet.create({
	txtcenter: {
		textAlign: 'center'
	},
    categoryItem: {
        marginLeft: 0, 
        paddingLeft: 20,
        paddingTop: 15,
        paddingRight: 10,
        paddingBottom: 15,
        borderBottomWidth: 0.5
    }
});

module.exports = Categories;