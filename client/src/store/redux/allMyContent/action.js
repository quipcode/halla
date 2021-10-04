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
    type:ActionTypes.GET_MY_CONTENT_FROM_SERVER_SUCCESS,
    payload: data    
})

export const getAllMyContent = () => dispatch => {
    dispatch(getAllMyContentLoading())
    let authToken = localStorage.getItem("hallaAuthToken")
    
}