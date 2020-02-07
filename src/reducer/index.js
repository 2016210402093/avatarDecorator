const defaultState = {
    picUrl: '',
    isEdit: false,
    cancelDecoration: 'inline'
}


const appReducer = (state = defaultState, action)=>{
    switch(action.type){
        case 'updatePicUrl': {
            return {...state, picUrl: action.picUrl};
        }

        case 'isEdit': {
            return {...state, isEdit: action.isEdit, picUrl: action.picUrl, cancelDecoration: action.cancelDecoration}
        }

        case 'cancelDecoration': {
            return {...state, cancelDecoration: action.cancelDecoration}
        }

        default:
            return state;
    }
}

export default appReducer;