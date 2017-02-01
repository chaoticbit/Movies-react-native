var BASE_URL = 'https://yts.ag/api/v2/list_movies.json';
import { AlertIOS } from 'react-native';
import axios from 'axios';

//  async function getMoviesFromApi() {
//         try {
//             let response = await fetch('https://facebook.github.io/react-native/movies.json');
//             let responseJson = await response.json();
//             return responseJson.movies;
// //             AlertIOS.alert(
// //                 "Response",
// //                 "result -> " + JSON.stringify(responseJson.movies)
// //             );
//         } catch(error) {
//             console.error(error);
//         }
// }

exports.getMoviesList = function() {    
  
    axios.get(BASE_URL)
      .then(function(response) {
        var obj = response.data;
        var moviesList = [];
      
        for(var i = 0; i < obj.movies.length; i++) {
            moviesList.push(obj.movies[i]);
        }
      
//         AlertIOS.alert(
//             "Response",
//             "list -> " + moviesList
//         )
        return moviesList;
      })
      .catch(function(error) {
        console.error(error);
      });
}

// <Card style={{ flex: 0 }}>
// 	                <CardItem>	                    
// 	                    <Text>NativeBase</Text>
// 	                </CardItem>
// 	                <CardItem cardBody> 
// 	                    <Image style={{ resizeMode: 'cover', width: null}} source={require('../img/sj.jpg')} /> 
// 	                    <Text>
// 	                        Here's to the crazy ones. {this.state.moviesList.length}
// 	                    </Text>	                    
// 	                </CardItem>
// 	           </Card>