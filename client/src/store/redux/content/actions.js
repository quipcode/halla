import axios from "axios";

import constants from "../../../utils/constants";
import * as ActionTypes from './actionTypes';

import alertActions from '../alert/actions'

export const createArticleLoading = () => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_LOADING
})

export const createArticleFailed = (error) => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_FAILED,
    payload: error
})

export const createArticleSuccess = (content) => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_SUCCESS,
    payload: content
})

export const createArticle = (content) => dispatch => {
    dispatch(createArticleLoading())
    let authToken = localStorage.getItem("hallaAuthToken")
    let author = localStorage.getItem("hallaAuthUser")
    
    console.log("in createArticle content is ")
    console.log(content)
    let keys_to_keep = ['content', 'isSummarySelected', 'isTitleSelected', 'title', 'summary', 'idx', 'sectionTypeId']
    let refinedSections = content.sections.map(
        element => Object.assign({}, ...keys_to_keep.map(
                key => (typeof element[key] === "boolean" ? element[key] ? { [key]: 1} : { [key]: 0 } : {[key]: element[key]})
            ))
        )
    console.log("content is ")
    console.log(content)

    // data = data.map(element => Object.assign({}, ...keys_to_keep.map(key => ({ [key]: element[key] }))))
    console.log("refined sections is.. ")
    console.log(refinedSections)
    
    const bodyParameters = {
        sections : refinedSections,
        article: content.article
    }
    return axios.post(`${constants.API_BASE_URL}/content`, bodyParameters, {
        headers: { Authorization: `Bearer ${authToken}` }
    })
        .then((response) => {
            console.log("savetoContentServer response is", response)
            dispatch(createArticleSuccess(response))
        })
        .catch((error) => {
            dispatch(createArticleFailed(error))
        })

}

export const getArticleLoading = () => ({
    type: ActionTypes.GET_CONTENT_FROM_SERVER_LOADING
})

export const getArticleFailed = (error) => ({
    type: ActionTypes.GET_CONTENT_FROM_SERVER_FAILED,
    payload: error
})

export const getArticleSuccess = (response) => ({
    type: ActionTypes.GET_CONTENT_FROM_SERVER_SUCCESS,
    payload: response
})

export const getArticle = (uuid) => dispatch => {
    dispatch(getArticleLoading())
    console.log("the uuid provided for the getarticle is " + uuid)
    let authToken = localStorage.getItem("hallaAuthToken")
    // return axios.get(`${constants.API_BASE_URL}/content/allmycontent`, {
    //     headers: { Authorization: `Bearer ${authToken}` }
    // })
    return axios.get(`${constants.API_BASE_URL}/content/${uuid}`,   { headers: { Authorization: `Bearer ${authToken}`} })
    .then((response) => {
        dispatch(getArticleSuccess(response))
    })
    .catch((error) => {
        console.log("error is ")
        console.log(error)
    })
}