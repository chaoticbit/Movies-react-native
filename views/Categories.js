import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView } from 'react-native';
import { Container, Title, Content, Icon, Button, Text, List, ListItem } from 'native-base';

class Categories extends Component {
  
    constructor(props) {
        super(props);
    }
  
	render() {
        
        var genreList = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
                        'History', 'Horror', 'Music', 'Mystery', 'News', 'Reality-TV', 'Romance', 'Sci-Fi', 'Sport', 'Talk-Show', 'Thriller', 'War'];;
      
		return (		
            <View>
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
        paddingBottom: 15
    }
});

module.exports = Categories;