import * as actionTypes from './actionTypes'

export default function alerts(state = {}, action) {
    switch (action.type) {
        case actionTypes.ALERT_SUCCESS:
            return {
                ...state,
                type: 'alert-success',
                message: action.message
            }
        case actionTypes.ALERT_ERROR:
            return {
                ...state,
                type: 'alert-danger',
                message: action.message
            }
        case actionTypes.ALERT_WARNING:
            return {
                ...state,
                type: "alert-warning",
                message: action.message
            }
        case actionTypes.ALERT_CLEAR:
            return {}
        default:
            return state
    }
}