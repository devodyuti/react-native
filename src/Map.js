import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import PlaceMarker from './PlaceMarker';
import {connect} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { latLong } from "./actions/searchActions";


class Maps extends React.Component {
  map= null;
  state = {
    markerLatitude: 0,
    markerLongitude: 0,
    disabled: false,
    region:{
          latitude:22.5726,
          longitude:88.3639,
          longitudeDelta:0.01,
          latitudeDelta: 0.002
  },
  onLatitudeChange:undefined,
  onlongitudeChange:undefined,
  location: {}

}

componentWillReceiveProps(nextProps) {
  nextProps.auth !== undefined && this.props.navigation.navigate('query');
}

toPlaceMarker() {
  console.log(this.state.onLatitudeChange);
  return this.state.onLatitudeChange? <PlaceMarker navigation={this.props.navigation} latitude={this.state.onLatitudeChange} longitude={this.state.onLongitudeChange}/> : <View/>
}

mapDraggComplete= (e) => {
  this.setState({
    markerLatitude: e.latitude,
    markerLongitude: e.longitude,
    region: {
      latitude: e.latitude,
      longitude: e.longitude,
      longitudeDelta:0.04,
      latitudeDelta: 0.02
    }
  }, ()=> {
    this.map.animateToRegion(this.state.region);
    console.log("location is", JSON.stringify(this.state.region),this.map.animateToRegion);
  });
  // this.setState({
  //   onLatitudeChange:e.latitude,
  //   onLongitudeChange:e.longitude
  // })
}

async getLocation() {
  let location = await Location.getCurrentPositionAsync({});
  this.setState({
    markerLatitude: location.coords.latitude,
    markerLongitude: location.coords.longitude,
    region: {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta:0.04,
      latitudeDelta: 0.0002
    }
  }, ()=> {
    this.map.animateToRegion(this.state.region);
    console.log("location is", JSON.stringify(this.state.region),this.map.animateToRegion);
  });
}

componentDidMount() {
  this.getLocation();
}
  render() {
    const latitude= this.state.markerLatitude ? this.state.markerLatitude: 0;
    const longitude= this.state.markerLongitude ? this.state.markerLongitude: 0;
    console.log("latitude and longitude is ", latitude, longitude);
    return (
      [
        <MapView 
          ref={ map => { this.map = map }}
          // showsUserLocation
          style={styles.maps}
          region={this.state.region}
          onRegionChangeComplete = {this.mapDraggComplete}
        >
          <MapView.Marker
            title="you are here"
            description="confirm your postion"
            pinColor="orange"
            coordinate={{
              latitude: latitude, 
              longitude: longitude
            }}
            id={1}
          />
        </MapView>,
        <Button
          style={{width: "30%", marginTop: 50}}
          disabled={this.state.disabled}
          color="blue"
          title="Confirm Position" 
          onPress={()=> {
            this.props.latLong(this.state.markerLatitude, this.state.markerLongitude);
            this.setState({
              disabled: true
            })
          }}
        />
      ]
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    auth:state.auth.accessToken
  }
}

const styles = StyleSheet.create({
  maps: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100
  }
})


export default connect(mapStateToProps, {latLong})(Maps)


{/* {this.toPlaceMarker()} */}
        {/* </MapView> */}