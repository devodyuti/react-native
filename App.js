import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import { TabNavigator } from 'react-navigation';
import Maps from './src/Map';
import Query from './src/Query';
import LoginForm from './src/LoginForm';
import FoodMenu from './src/FoodMenu';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import * as permissions from "expo-permissions";
import * as Location from 'expo-location';
// import { Locations, Permissions } from "expo-permissions";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      error: "",
      locations: ""
    }
  }

  async findCurrentLocationAsync() {
    console.log("hereeeeeeeeeeeeeeeee");
    let {status} = await Location.requestPermissionsAsync()
    console.log("status issssssssssss", status);
    if (status !== "granted") {
      this.setState({
        error: "Access not granted"
      });
  }
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        locations: location
      }, ()=> {
        console.log("location is", JSON.parse(JSON.stringify(location)));
      });
}

componentDidMount() {
  this.findCurrentLocationAsync();
}
  
  render() {
    const MainNavigator = TabNavigator({
      login:{screen: LoginForm},
      // map:{screen: Map},
      // query:{screen: Query},
      // menu:{screen:FoodMenu}
      });
      const Tab = createMaterialBottomTabNavigator();
      
    return (
      // <View><Text>sfggfd</Text></View>
      <Provider store={store}>
        {this.state.error ? (<View><Text>{this.state.error}</Text></View>) :(
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Login" component={LoginForm} />
            <Tab.Screen name="Map" component={Maps} />
            <Tab.Screen name="Query" component={Query} />
            <Tab.Screen name="Food" component={FoodMenu} />
          </Tab.Navigator>
        </NavigationContainer>)}
        {/* <MainNavigator/> */}
        {/* <LoginForm/> */}
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
