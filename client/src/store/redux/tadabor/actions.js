import axios from "axios";

import constants from "../../../utils/constants";

import * as ActionTypes from './actionTypes'

export const getScriptLoading = () =>({
    type: ActionTypes.GET_SCRIPT_LOADING
})
export const getScriptFailed = (error) =>({
    type: ActionTypes.GET_SCRIPT_FAILED,
    payload: error
})
export const getScriptSuccess = (script) =>({
    type: ActionTypes.GET_SCRIPT_SUCCESS,
    payload: script
})

export const getScript = (reqBody) => dispatch => {
    dispatch(getScriptLoading())
    console.log("in getscript action reqbody is ")
    console.log(reqBody)
    // https://stackoverflow.com/questions/53501185/how-to-post-query-parameters-with-axios

    
    
    // let {verseKey} = reqBody
    // var data = {};

    // const params = new URLSearchParams({
    //     verseKey: verseKey
    // }).toString();

    // const url =
    //     `${constants.API_BASE_URL}/api/quran/verse/` +
    //     params;
    // axios
    //     .post(url, data, {
    //         headers: {
    //             Authorization: "Bearer " + token
    //         }
    //     })
    //     .then(res => {
    //         console.log(JSON.parse(res.data))
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // axios.post(
    //     url,
    //     {},
    //     {
    //         params: {
    //             verseKey
    //         }
    //     }
    // )
    //     .then(response => {
    //         console.log(response)
    //         return success(response);
    //     })
    //     .catch(error => {
    //         console.log(response)
    //         return fail(error);
    //     });

    // return axios
    //     .post(`${constants.API_BASE_URL}/api/quran/verse/`)
}

export const getTranslationLoading = () => ({
    type: ActionTypes.GET_TRANSLATION_LOADING
})
export const getTranslationFailed = (error) => ({
    type: ActionTypes.GET_TRANSLATION_FAILED,
    payload: error
})
export const getTranslationSuccess = (translation) => ({
    type: ActionTypes.GET_TRANSLATION_SUCCESS,
    payload: translation
})


export const getTafsirLoading = () => ({
    type: ActionTypes.GET_TAFSIR_LOADING
})
export const getTafsirFailed = (error) => ({
    type: ActionTypes.GET_TAFSIR_FAILED,
    payload: error
})
export const getTafsirSuccess = (tafsir) => ({
    type: ActionTypes.GET_TAFSIR_SUCCESS,
    payload: tafsir
})