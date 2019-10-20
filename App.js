/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Список фотографий',
  };
	constructor(props) {
		super(props);
		//this._rowPressed = this._rowPressed.bind(this);
		this.state = {
			loading: true,
			dataSource:null,
		};
	}
	
componentDidMount(){
return fetch("https://api.unsplash.com/photos/?client_id=896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043")
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   loading: false,
   dataSource: responseJson
  })
})
.catch(error=>console.log(error)) //to catch the errors if any
}
FlatListItemSeparator = () => {
return (
  <View style={{
     height: .5,
     width:"100%",
     backgroundColor:"rgba(0,0,0,0.5)",
}}
/>
);
}

renderItem=(data)=>
<TouchableOpacity style={styles.list} onPress={() => this.rowPressed(data.item)}
        underlayColor='#dddddd'>
  <View>	
	<View style={styles.rowContainer}>
		<Image
			style={{width: 50, height: 50}}
			source={{uri: data.item.urls.thumb}}
		/>
		<View>
			<Text style={styles.title}>{data.item.user.name}</Text>
			<Text style={styles.title}>{data.item.alt_description}</Text>
		</View>	
	</View>
  </View>	
</TouchableOpacity>	

rowPressed(dataItem)  {
  
  this.props.navigation.navigate('Details',
  {
	  dataItem: dataItem  
  });
  
}
	
  render() {
	  
	   if(this.state.loading){
		return( 
			<View style={styles.container}> 
				<ActivityIndicator size="large" color="#0c9"/>
	  	
				</View>

		)}
	  
    return (
        <FlatList 
			data= {this.state.dataSource}
			ItemSeparatorComponent = {this.FlatListItemSeparator}
			renderItem= {item=> this.renderItem(item)}
			keyExtractor= {item=>item.id.toString()} 
		/>
      
    );
  }
}

class DetailsScreen extends React.Component {
	static navigationOptions = {
		title: 'Photo',
  };


  render() {
	 let { navigation } = this.props;
	  
    return (
		

		<SafeAreaView style={styles.container}>
			<Image 
			style={{
					width: Dimensions.get('window').width, 
                    height: Dimensions.get('window').height,
					}}
					source={{uri: eval(JSON.stringify(navigation.getParam('dataItem', 'noUrl').urls.full))}}
			/>
		</SafeAreaView>		
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen, 
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
  
const AppContainer = createAppContainer(RootStack);

const App: () => React$Node = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
