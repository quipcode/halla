import * as ActionTypes from './actionTypes'

export default function (state = {}, action){
    switch(action.type){
        case ActionTypes.GET_SCRIPT_LOADING:
            return {...state, isLoading: true, errMess: null}
        case ActionTypes.GET_SCRIPT_FAILED:
            return{
                ...state,
                isLoading: false,
                errMess: action.payload.message
            }
        case ActionTypes.GET_SCRIPT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                errMess: null,
                script: action.payload.data.verses[0].text_uthmani
            }
        case ActionTypes.GET_TAFSIR_FAILED:
            return{
                ...state,
                isLoading:false,
                errMess: action.payload.message,
            }
        case ActionTypes.GET_TAFSIR_LOADING:
            return{
                ...state,
                isLoading:true,
                errMess: null
            }
        case ActionTypes.GET_TAFSIR_SUCCESS:
            return{
                ...state,
                isLoading: false,
                errMess: null,
                tafsir: action.payload.data.tafsirs[0].text
            }
        case ActionTypes.GET_TRANSLATION_FAILED:
            return{
                ...state,
                isLoading: false,
                errMess: action.payload.message
            }
        case ActionTypes.GET_TRANSLATION_LOADING:
            return{
                ...state,
                isLoading: true,
                errMess: null
            }
        case ActionTypes.GET_TRANSLATION_SUCCESS:
            return{
                ...state,
                isLoading: false,
                errMess: null,
                translation: action.payload.translations[0].text
            }
        default:
            return state
    }
}