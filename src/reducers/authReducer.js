
export const authReducer = (state={},action)=> {
    switch(action.type) {
        case 'authenticate_user':
            return {...state,accessToken:action.payload};
        default:
            return state;
    }
}