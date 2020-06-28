import * as React from 'react';
import {ListItem, Input} from 'react-native-elements';
import {Icon} from 'react-native-vector-icons';
import {connect} from 'react-redux';
import {searchActions} from  './actions/searchActions';
import {View,TextInput,BackHandler, Text, StyleSheet, Button} from 'react-native';
import {callFourSquare} from './actions/callFourSquare';

class Query extends React.Component {

    state = {
        text:''
    }
    onChangeText(text){
        this.callService(text)
    }

    constructor(props){
        super(props);
       
    }

    componentDidMount(){
        // BackHandler.addEventListener('hardwareBackPress',()=>{
        //     this.props.navigation.navigate('map');
        // });
    }

    goToMenuPage = (item)=> {
        // this.setState({text:''});
        // this.props.searchActions('');
        this.props.callFourSquare(this.props.latLong.latitude,this.props.latLong.longitude,item,this.callback)
    }
    
    callback = ()=> {
        this.props.navigation.navigate('menu');
    }

    callService(text) {
        this.setState({text})
        this.props.searchActions(text);

    }

    edibleChanged(text) {
        this.setState({
            text: text
        })
    }

    renderList() {
        return this.props.search!==undefined && this.props.search.map((item,i)=> {
            return <ListItem
                        key={i}
                        title={item}
                        onPress = {()=>{ this.goToMenuPage(item)}}
                    />
        });

    }

    render() {
        return(
            <View style={styles.mainHolder}>
                <View>
                    <Text style={styles.menuHeader}> Tell Us What You Want to Eat ! </Text>
                </View>
                <View style={{marginTop: 30, borderWidth: 1, width: "50%", marginLeft: 10}}>
                    <TextInput
                        // style={{justifyContent:'center'}}
                        onChangeText = {(text)=> {
                            this.edibleChanged(text);
                        }}
                        value={this.state.text}
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <Button
                        onPress={()=>this.goToMenuPage(this.props.text)}
                        title="lets Eat !" 
                    />
                </View>
                {/* {this.renderList()} */}
            </View>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        search:state.search.query,
        latLong:state.latLong
    }
}

const styles = StyleSheet.create({
    mainHolder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 

    menuHeader: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default connect(mapStateToProps,{searchActions,callFourSquare})(Query);