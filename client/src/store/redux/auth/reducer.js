import * as ActionTypes from './actionTypes'
import initialState from './initial-state'

export default function(state = initialState.auth, action){
    switch (action.type) {
        case ActionTypes.LOGIN_LOADING:
            return { ...state, isLoading: true, errMess: null, sessionToken: null }
        case ActionTypes.LOGIN_SUCCESS:

            return {
                ...state,
                isLoading: false,
                errMess: null,
                sessionToken: action.payload.data.accessToken,
                username: action.payload.data.username,
                isAuthenticated: true,
            }
        case ActionTypes.LOGIN_FAILED:

            return {
                ...state,
                isLoading: false,
                errMess: action.payload.message,
            }
        case ActionTypes.LOGOUT_FAILED:

            return {
                ...state,
                isLoading: false,
                errMess: action.payload.message,
            }
        case ActionTypes.LOGOUT_SUCCESS:

            return {
                ...state,
                isLoading: false,
                errMess: null,
                sessionToken: null,
                username: null,
                isAuthenticated: false,
            }
        case ActionTypes.LOGOUT_LOADING:

            return {
                ...state,
                isLoading: true,
                errMess: null,
            }



        case ActionTypes.REGISTER_FAILED:


            return {
                ...state,
                isLoading: false,
                errMess: action.payload,

            }
        case ActionTypes.REGISTER_SUCCESS:


            return {
                ...state,
                isLoading: false,
                errMess: null,
                isRegistered: true,
            }
        case ActionTypes.REGISTER_LOADING:

            return {
                ...state,
                isLoading: true,
                errMess: null,
            }

        default:
            return state
    }
}