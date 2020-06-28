import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {searchReducer,latLongReducer} from './searchReducer';
import {fourSquareReducer} from './fourSquareReducer';

const reducer = combineReducers({
    auth:authReducer,
    search:searchReducer,
    latLong:latLongReducer,
    fourSquareResponse:fourSquareReducer
});

export default reducer;