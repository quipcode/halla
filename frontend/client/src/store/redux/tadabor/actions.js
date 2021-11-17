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

export const getVerse = (reqBody, header) => dispatch => {
    dispatch(getScriptLoading())
    console.log("in getscript action reqbody is ")
    console.log(reqBody)
    let script = ""
    let tafsir = ""
    let translation = ""
    let error
    
    let packet = {};
    let data = {};

    const uthmaniURL = `${constants.API_BASE_URL}/quran/verse/` + reqBody.verseKey;
    const translationURL = `${constants.API_BASE_URL}/quran/verse/translation/` + reqBody.verseKey;
    const tafsirURL = `${constants.API_BASE_URL}/quran/verse/tafsir/` + reqBody.verseKey;
    
    
    if (reqBody.uthmaniChecked && !reqBody.translationChecked && !reqBody.tafsirChecked){

        axios
            .get(uthmaniURL, data, {
                headers: header
            })
            .then(res => {
                 script = res.data.verses[0].text_uthmani
                 packet.script = script
            })
            .catch(err => {
                error = err
                packet.error = error
            });
    } 
    if (reqBody.translationChecked){
        axios
            .get(translationURL, data, {
                headers: header
            })
            .then(res => {
                translation = res.data.translations[0].text
                packet.translation = translation
            })
            .catch(err => {
                error = err
                packet.error = error
            });
    }

    if (reqBody.tafsirChecked){
        axios
            .get(tafsirURL, data, {
                headers: header
            })
            .then(res => {
                tafsir = res.data.tafsirs[0].text
                packet.tafsir = tafsir
            })
            .catch(err => {
                error = err
            });
    }

    return packet

}
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