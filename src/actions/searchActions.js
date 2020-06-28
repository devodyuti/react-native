
export const searchActions = (text) => {
    return dispatch => {
        const array = ['coffee','Multiplex'];
        const modifiedArray = array.filter(element=> text===element.substring(0,text.length) && text!=='');
        dispatch({type:'query_options',payload:modifiedArray});
    }
}

export const latLong = (lat,long) => {
    return {
        type:'latitude and longitude',
        payload:{
            latitude:lat,
            longitude:long
        }
    };
}