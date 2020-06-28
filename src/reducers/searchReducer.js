export const searchReducer =  (state=[],action) => {
    switch(action.type){
        case 'query_options':
            return {...state,query:action.payload};
        default:
            return state;
    }
}

export const latLongReducer = (state={},action)=> {
    switch(action.type){
        case 'latitude and longitude':
            return {...state,
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude
            };
        default:
            return state;
    }
}