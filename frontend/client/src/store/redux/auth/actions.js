import axios from 'axios'

import history from '../../../utils/history'
import adminHistory from '../../../utils/adminHistory'
import constants from '../../../utils/constants'

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
            dispatch(successfulJwtLogin(res.data.username, res.data.token))
            document.title = "Halla-Blogs"
            history.push('/admin/')
        })
        // .then( () =>{
           
        // })
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
    localStorage.setItem(constants.USERNAME, username)
    localStorage.setItem(constants.TOKEN, token)
    dispatch(setupAxiosInterceptors(dispatch(createJwtToken(token))))
}

export const createJwtToken = (token) => dispatch => {
    return 'Bearer ' + token
}

// export const isUserLoggedIn = () => dispatch => {
//     let user = localStorage.getItem(constants.USERNAME)
//     let token = localStorage.getItem(constants.TOKEN)
//     return user !== null && token !== null
// }

export const getSelf = (requestBody) => dispatch => {
    console.log("reqbody is ", requestBody)
    let authToken = localStorage.getItem("hallaAuthToken")
    let config = {
        method: 'get',
        url: `${constants.API_BASE_URL}/auth/self`,
        headers: { Authorization: `Bearer ${authToken}` }
      }
    dispatch(getSelfLoading())
    console.log("reqbody is ", requestBody)
    // axios.get(`${constants.API_BASE_URL}/auth/self`, config)
    return axios(config)           
            .then(res => {
                console.log("getself response is", res)
                dispatch(getSelfSuccess(res))
            })
            .catch(error => {
                dispatch(alertActions.error(error.response.data.message))
            })

}

export const getSelfLoading = () => ({
    type: ActionTypes.GET_SELF_LOADING
})
export const getSelfFailed = (err) => ({
    type: ActionTypes.GET_SELF_FAILED,
    payload: err
})
export const getSelfSuccess = (res) => ({
    type: ActionTypes.GET_SELF_SUCCESS,
    payload: res
})

//not sure if this should be in actions...simply parsing auth token and comparing it w/ associated username from local storage...purely clientside...never hitting server 
// export const currentUsername = () => dispatch => {
//     let currUsername = localStorage.getItem(constants.USERNAME)
//     let token = localStorage.getItem(constants.TOKEN)
//     let currUserTokenObj = parseJwt(token)
//     // if(!user) return Promise.reject("No user set");
//     if (currUsername != currUserTokenObj.sub) return Promise.reject("No user set");
//     return currUsername;
// }

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


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

    localStorage.removeItem(constants.AUTHSTATE)
    localStorage.removeItem(constants.USERNAME)
    localStorage.removeItem(constants.TOKEN)
    // dispatch(logoutLoading())
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


