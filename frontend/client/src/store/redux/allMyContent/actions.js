import axios from "axios";
import * as ActionTypes from './actionTypes'
import constants from "../../../utils/constants";


export const getAllMyContentLoading = () => ({
    type: ActionTypes.GET_MY_CONTENT_FROM_SERVER_LOADING
})

export const getAllMyContentFailed = (error) => ({
    type: ActionTypes.GET_MY_CONTENT_FROM_SERVER_FAILED,
    payload: error
})

export const getAllMyContentSuccess = (data) => ({
    type: ActionTypes.GET_MY_CONTENT_FROM_SERVER_SUCCESS,
    payload: data
})

export const getAllMyContent = (s) => dispatch => {
    dispatch(getAllMyContentLoading())
    let authToken = localStorage.getItem("hallaAuthToken")
    
    return axios.get(`${constants.API_BASE_URL}/content/allmycontent`, {
        headers: { Authorization: `Bearer ${authToken}` }
    })
        .then((response) => {
            dispatch(getAllMyContentSuccess(response))
        })
        .catch((error) => {
            dispatch(getAllMyContentFailed(error))
        })

}