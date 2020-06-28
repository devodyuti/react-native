import React, {Component} from 'react';
import {MapView} from 'expo';
import {userAuthentication} from './actions/userAuthentication';
import {connect} from 'react-redux';
import {latLong} from './actions/searchActions';

class PlaceMarker extends Component {
    componentDidMount(){
        console.log('Marker Mounted');
    }

    showQueryPage = ()=> {
        this.props.latLong(this.props.latitude,this.props.longitude);
        this.props.navigation.navigate('query');
    }

    render() {
        return(
        <MapView.Marker
            coordinate={{
                latitude:this.props.latitude,
                longitude:this.props.longitude
            }}
            onPress = {this.showQueryPage}    
        />
    );
    }
}

export default connect(null,{latLong})(PlaceMarker)