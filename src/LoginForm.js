import React from 'react';
import {View,Text,Image,CustomCachedImage,ImageBackground,Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
// import {giveImage} from './changeImage';
import { userAuthenticationUsingGoogle,userAuthenticationUsingFacebook } from './actions/userAuthentication';

const x =1
class LoginForm extends React.Component {

    // componentWillReceiveProps(nextProps) {
    //     nextProps.auth !== undefined && this.props.navigation.navigate('map');
    //   }
    

    callback = ()=> {
        console.log('dev'+x);
        // this.props.navigation.navigate('map')
    }

    loginFacebook = () => {
        this.props.userAuthenticationUsingFacebook(this.callback);
    }

    loginGoogle = () => {
        this.props.userAuthenticationUsingGoogle(this.callback);
    }

    render() {
        return(
                // <ImageBackground
                //     style={{flex:1, resizeMode: 'cover'}}
                //     source={require('../image/appImage.jpg')}
                // >
                <View style={{flex:1}}>
                <View style={{marginTop:300,justifyContent:'center'}}>
                    <Button
                    title="Login Using Google"
                    titleStyle={{fontWeight:700}}
                    buttonStyle={{
                        backgroundColor:"blue",
                        width:300,
                        height:45,
                        borderColor:"transparent",
                        borderWidth:0,
                        borderRadius:5
                    }}
                    containetStyle={{
                        marginTop: 20
                    }}
                    onPress = {this.loginGoogle}
                    />
                </View>
                {/* <View style={{marginTop:30,justifyContent:'center'}}>
                    <Button
                        title="Login Using Facebook"
                        titleStyle={{fontWeight:700}}
                        buttonStyle={{
                            backgroundColor:"blue",
                            width:300,
                            height:45,
                            borderColor:"transparent",
                            borderWidth:0,
                            borderRadius:5
                        }}
                        containetStyle={{
                            marginTop: 20
                        }}
                        onPress = {this.loginFacebook}
                        />
                </View> */}
                </View>
                // </ImageBackground>
        );
    }
}

const mapStateToProps = (state)=>{
    
    return {
      auth:state.auth.accessToken
    }
  }

export default connect(mapStateToProps,{userAuthenticationUsingGoogle,userAuthenticationUsingFacebook})(LoginForm);