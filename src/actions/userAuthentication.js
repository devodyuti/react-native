// import {Google,Facebook} from 'expo';
import * as Google from 'expo-google-app-auth';
import { googleId } from "../constants";

export const userAuthenticationUsingGoogle = (callback)=> async dispatch=> {
        try {
            const result = await Google.logInAsync({
              androidClientId: googleId,
              scopes: ['profile', 'email'],
            });
    
            if (result.type === 'success') {
              console.log("result is",result);
              dispatch({type:'authenticate_user',payload:result.accessToken});
              callback();
            } else {
              console.log('Failed');
            }
          } catch(e) {
            console.log(e);
          }
}
