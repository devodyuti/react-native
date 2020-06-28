
export const fourSquareReducer = (state={},action)=> {
    switch(action.type){
        case 'four-square-response':
            console.log(action.payload);
            return {...state,fourSquareResponseArray : action.payload};
        default:
            return state;
    }
}