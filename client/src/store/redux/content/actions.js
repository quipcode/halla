import axios from "axios";

import constants from "../../../utils/constants";
import * as ActionTypes from './actionTypes';

import alertActions from '../alert/actions'

export const saveContentToServerLoading = () => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_LOADING
})

export const saveContentToServerFailed = (error) => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_FAILED,
    payload: error
})

export const saveContentToServerSuccess = (content) => ({
    type: ActionTypes.SAVE_CONTENT_TO_SERVER_SUCCESS,
    payload: content
})

export const saveContentToServer = (content) => dispatch => {
    // dispatch(saveContentToServerLoading())
    let authToken = localStorage.getItem("hallaAuthToken")
    let author = localStorage.getItem("hallaAuthUser")
    
    console.log("in saveContentToServer content is ")
    console.log(content)
    // let mapppedContent = content.map(i => {})
    // var data = [
    //     { name: 'John', city: 'London', age: 42 },
    //     { name: 'Mike', city: 'Warsaw', age: 18 },
    //     { name: 'Jim', city: 'New York', age: 22 },
    //     { name: 'Celine', city: 'Tokyo', age: 54 },
    // ]

    // var keys_to_keep = ['name', 'city']
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
    
    // console.log("content title is " + contentTitle, "contentEditor is " + contentEditor )
    // console.log(localStorage.getItem("hallaAuthUser"), localStorage.getItem("hallaAuthToken"))
    // let auth = "Bearer " + authToken
    // console.log("beare token" , auth)
    const config = {
        method: 'post',
        url: `${constants.API_BASE_URL}/content`,
        headers: { 
            Authorization: `Bearer ${authToken}`,
            'Access-Control-Allow-Origin': '*',
        },
        // data: {
        //     contentSections: refinedSections,
        // }
    }
    const bodyParameters = {
        contentSections : refinedSections,
    }


    // return axios.post(`${constants.API_BASE_URL}/content`, bodyParameters, {
    //     headers: { Authorization: `Bearer ${authToken}` }
    // })
    //     .then((response) => {
    //         console.log("savetoContentServer response is", response)
    //         // dispatch({
    //         //     type: FOUND_USER,
    //         //     data: response.data[0]
    //         // })
    //     })
    //     .catch((error) => {
    //         dispatch(alertActions.error(error.response.data.message))
    //         // dispatch({
    //         //     type: ERROR_FINDING_USER
    //         // })
    //     })


    // return axios(config)
    //     .then(res => {
    //         console.log("savetoContentServer response is", res)
    //         dispatch(saveContentToServerSuccess(res))
    //         // dispatch(getSelfSuccess(res))
    //     })
    //     .catch(error => {
    //         dispatch(alertActions.error(error.response.data.message))
    //     })
    // axios.post(
    //     `${constants.API_BASE_URL}/content/new`,
    //     bodyParameters,
    //     config
    // ).then(console.log).catch(console.log);
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