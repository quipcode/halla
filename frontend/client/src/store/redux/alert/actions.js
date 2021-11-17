import * as actionTypes from './actionTypes'

function success(message) {
    return { type: actionTypes.ALERT_SUCCESS, message };
}

function error(message) {
    return { type: actionTypes.ALERT_ERROR, message };
}

function warning(message) {
    return { type: actionTypes.ALERT_WARNING, message }
}

function clear() {
    return { type: actionTypes.ALERT_CLEAR };
}

export default {
    success,
    error,
    warning,
    clear
}