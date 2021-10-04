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
    // dispatch(getAllMyContentLoading())
    getAllMyContent
    let authToken = localStorage.getItem("hallaAuthToken")
    console.log("in getallmycontent actions")
    console.log("url is a s follows " + `${ constants.API_BASE_URL }/content/allmycontent`)

    return axios.get(`${constants.API_BASE_URL}/content/allmycontent`, { headers : { Authorization: `Bearer ${authToken}` }})
    .then((response) => {
        console.log("got success full get allmycontent  see below")
        console.log(response)
    })
    .catch((error) => {
        console.log("Errorred out ")
        console.log(error)
    })


}