import axios from "axios";

import constants from "../../../utils/constants";
import * as ActionTypes from './actionTypes';

export const saveContentToServerLoading = () => ({
    type: ActionTypes.SAVE_TO_SERVER_LOADING
})

export const saveContentToServerFailed = (error) => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_FAILED,
    payload: error
})

export const saveContentToServerSuccess = (content) => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_SUCCESS,
    payload: content
})

export const saveContentToServer = (contentTitle, contentEditor) => dispatch => {
    // dispatch(saveContentToServerLoading())
    let authToken = localStorage.getItem("hallaAuthToken")
    
    // console.log("content title is " + contentTitle, "contentEditor is " + contentEditor )
    // console.log(localStorage.getItem("hallaAuthUser"), localStorage.getItem("hallaAuthToken"))
    // let auth = "Bearer " + authToken
    // console.log("beare token" , auth)
    const config = {
        headers: { Authorization: `Bearer ${authToken}`}
    }
    const bodyParameters = {
        title : contentTitle,
        content: contentEditor
    }
    
    axios.post(
        `${constants.API_BASE_URL}/content/new`,
        bodyParameters,
        config
    ).then(console.log).catch(console.log);
    // console.log(reqbody)
    // return axios
    //     .post(`${constants.API_BASE_URL/content}`, reqbody)
    //     .then(res => { dispatch(saveContentToServerSuccess(res))
    //     })
    //     .catch(error => {
    //         if (error.message == 'Network Error') {
    //             dispatch(saveContentToServerFailed(error))
    //         }else{
    //             dispatch(saveContentToServerFailed(error))
    //         }
    //     })

}