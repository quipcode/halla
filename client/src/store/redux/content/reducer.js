import * as ActionTypes from './actionTypes'
import initialState from './initial-state'

export default function(state = initialState, action){
    switch(action.type){
        case ActionTypes.SAVE_CONTENT_TO_SERVER_LOADING:
            return { ...state, isLoading: true, errMess: null }
        case ActionTypes.SAVE_CONTENT_TO_SERVER_FAILED:
            return {...state, isLoading: false, errMess: action.payload.message }
        case ActionTypes.SAVE_CONTENT_TO_SERVER_SUCCESS:
            return {...state, isLoading: false, errMess: null, contentSaved: true, article: action.payload.data.article, sections: action.payload.data.sections}
        
        default:
            return state
    }
}