import * as ActionTypes from './actionTypes'

export default function(state = {}, action){
    switch(action.type){
        case ActionTypes.SAVE_TO_SERVER_LOADING:
            return { ...state, isLoading: true, errMess: null }
        case ActionTypes.SAVE_TO_SERVER_FAILED:
            return {...state, isLoading: false, errMess: action.payload.message }
        case ActionTypes.SAVE_TO_SERVER_SUCCESS:
            return {...state, isLoading: false, errMess: null, contentSaved: true}
        
        default:
            return state
    }
}