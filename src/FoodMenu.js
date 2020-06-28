import React from 'react';
import {View,Text,ScrollView,Linking} from 'react-native';
import {connect} from 'react-redux';
import {Card,Button} from 'react-native-elements';
//import getDirections from 'react-native-google-maps-directions';
//import {Linking} from 'expo';

const url = 'http://maps.google.com/maps?daddr='

class FoodMenu extends React.Component{

    handleOnPress = (latitude,longitude) => {
        // const data = {
        //     source:{
        //         latitude:latitude,
        //         longitide:longitude
        //     },
        //     destination: {
        //         latitude:latitude,
        //         longitide:longitude
        //     },
        //     params:[
        //         {
        //             key:'travelmode',
        //             value:'driving'
        //         },
        //         {
        //             key:'dir_action',
        //             value:'navigate'
        //         }
        //     ]
        // }

        // getDirections(data);
        Linking.openURL(url+latitude+','+longitude+'&saddr=12.2958,76.6394');

    }

    renderListOfSearchedItems() {
        //console.log(this.props.fourSquareResponseArray[0].venue.name);
        return this.props.fourSquareResponseArray.map(item=> {
            return (
                <Card
                    title = {item.venue.name}
                >
                    <Text>
                        Address:`${item.venue.location.address},${item.venue.location.city},${item.venue.location.state},${item.venue.location.postalCode}`
                        Phone:{item.venue.contact.phone}
                    </Text>
                    <Button
                        title='get direction'
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 300,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                          }}
                        onPress = {()=>this.handleOnPress(item.venue.location.lat,item.venue.location.lng)}
                    />
                </Card>
            );
        });
    }

    render(){
        return(
            <ScrollView>
                {this.renderListOfSearchedItems()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        fourSquareResponseArray: state.fourSquareResponse.fourSquareResponseArray
    };
};

export default connect(mapStateToProps,{})(FoodMenu);