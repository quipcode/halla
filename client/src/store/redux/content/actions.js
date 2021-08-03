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

export const saveContentToServerLoading = (content) => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_SUCCESS,
    payload: content
})

export const saveContentToServer = (reqbody) =>{
    dispatch(saveContentToServerLoading())
    console.log("in save content to server")
    console.log(reqbody)
}