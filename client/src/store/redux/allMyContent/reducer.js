import * as ActionTypes from './actionTypes'
import initialState from './initialState'

export default function(state = initialState, action){
    switch(action.type){
        case ActionTypes.GET_MY_CONTENT_FROM_SERVER_LOADING:
            return {...state, errMess: null, isLoading: true, contentObtained: false,}
        case ActionTypes.GET_MY_CONTENT_FROM_SERVER_FAILED: 
            return{...state, isLoading: false, errMess: action.payload.message}
        case ActionTypes.GET_MY_CONTENT_FROM_SERVER_SUCCESS:
            return{...state, isLoading: false, errMess: null, contentObtained: true, articles: action.payload.data.content}
        default:
            return state;
    }

}