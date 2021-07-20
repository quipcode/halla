import axios from 'axios'

import history from '../../../utils/history'
import constants from '../../../utils/constants'
// import history from '../../../utils/'

import * as ActionTypes from './actionTypes'

import alertActions from '../alert/actions'

export const loginLoading = () => ({
    type: ActionTypes.LOGIN_LOADING
})

export const loginFailed = (err) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: err
})

export const loginSuccess = logintoken => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: logintoken
})


export const loginUser = (credentials) => dispatch => {
    dispatch(loginLoading())

    return axios
        .post(`${constants.API_BASE_URL}/auth/login`, credentials)
        .then(res => {
            dispatch(loginSuccess(res))
            dispatch(successfulJwtLogin(res.data.username, res.data.accessToken))
            document.title = "Halla-Blogs"
            history.push('/home')
        })
        .catch((error) => dispatch(loginFailed(error)))
}

export const registerLoading = () => ({
    type: ActionTypes.REGISTER_LOADING
})

export const registerFailed = (err) => ({
    type: ActionTypes.REGISTER_FAILED,
    payload: err
})

export const registerSuccess = logintoken => ({
    type: ActionTypes.REGISTER_SUCCESS,
    payload: logintoken
})


export const registerUser = (credentials) => dispatch => {
    let { username, email, password } = credentials
    let reqBody = { username, password }
    dispatch(registerLoading())


    return axios
        .post(`${constants.API_BASE_URL}/auth/register`, credentials)
        .then(res => {
            dispatch(registerSuccess(res))
            history.push('/login');
            dispatch(alertActions.success("Registration successful"))

        })
        .catch(error => {
            if (error.message == 'Network Error') {
                dispatch(alertActions.error("Network Error, please try again or contact support"))
                dispatch(registerFailed(error))
            } else {
                dispatch(alertActions.warning(error.response.data.message))
                dispatch(registerFailed(error))
            }
        }
        )
}

export const executeRegistration = (data) => dispatch => {
    return axios.post(`${constants.API_BASE_URL}/auth/register`, data)
}

export const executeJwtAuthentication = (data) => dispatch => {
    return axios.post(`${constants.API_BASE_URL}/auth/login`, data)
}

export const successfulJwtLogin = (username, token) => dispatch => {
    localStorage.setItem(constants.HALLA_AUTH_USER, username)
    localStorage.setItem(constants.HALLA_AUTH_TOKEN, token)
    dispatch(setupAxiosInterceptors(dispatch(createJwtToken(token))))
}

export const createJwtToken = (token) => dispatch => {
    return 'Bearer ' + token
}

export const isUserLoggedIn = () => dispatch => {
    let user = localStorage.getItem(constants.HALLA_AUTH_USER)
    let token = localStorage.getItem(constants.HALLA_AUTH_TOKEN)
    return user !== null && token !== null
}

export const logoutLoading = () => ({
    type: ActionTypes.LOGOUT_LOADING
})

export const logoutFailed = (err) => ({
    type: ActionTypes.LOGOUT_FAILED,
    payload: err
})

export const logoutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS,
    payload: ""
})

export const logoutUser = () => dispatch => {


    localStorage.removeItem(constants.HALLA_AUTH_USER)
    localStorage.removeItem(constants.HALLA_AUTH_TOKEN)
    dispatch(logoutLoading())
    dispatch(logoutSuccess())
    history.push('/')
}

export const setupAxiosInterceptors = (token) => dispatch => {

    axios.interceptors.request.use(

        (config => {

            if (dispatch(isUserLoggedIn())) config.headers.authorization = token
            return config
        })


    )
}


