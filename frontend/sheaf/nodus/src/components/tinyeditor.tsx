import { Editor } from '@tinymce/tinymce-react';
import React, { useCallback, useState, useRef, useEffect} from "react";

import { constants } from '../utils/constants';
import StatusBar from './statusbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TINYMCE_API_KEY} from '../utils/enironmentConstants'
// import constants from '../utils/constants';
// import StatusBar from './statusbar';
// import * as _ from "lodash";
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { createArticle} from '../store/redux/content/actions'
// import {connect} from  "react-redux"

import { TextInput} from 'react-admin'

function TinyEditor(props: any){
    const [contentEditor, setContentEditor] = useState(props.value);
    const editor = useRef(null);
    const editorRef = useRef(null);

    const handleEditorChange = (content: any, editor: any) => {
        // console.log('Content was updated:', content, editor);
        // console.log(content)
        props.onChange(content);
        // setContentEditor(content);
    }

    // const handleTitleChange = (event) => {
    //     console.log(event)
    //     setContentTitle(event.target.value)
    // }

    const handleEditorSave = () => {
        setContentEditor(editor.current.props.value)
    };


    // const handlePublish = (event) => {
    //     setDisplayIsSaving(true)
    //     throttledSaveToServer();
    //     console.log("publish was pressed: ", contentEditor, contentTitle)
    //     event.preventDefault();
    // }
    
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     setDisplayIsSaving(true)
    //     // console.log("save was pressed: ", contentEditor, contentTitle, localStorage.getItem("hallaAuthUser"), localStorage.getItem("hallaAuthToken"))
    //     props.createArticle(contentTitle, contentEditor)
    //     throttledSaveToServer();
    // }

    // const handleCancel = (event) => {
    //     event.preventDefault();
    // }
    
    // const saveToServer = this.props.createArticle;

    // const throttledSaveToServer = _.throttle(() => {
    //     setTimeout(() => {
    //         console.log("Saved to server", contentTitle, contentEditor);
    //         debouncedEndSaving();
    //     }, 500);
    // }, 500);

    // const debouncedEndSaving = _.debounce(() => {
    //     setDisplayIsSaving(false)
    // }, 1000);


    // const componentWillUnmount = () => {
    //     debouncedEndSaving.cancel();
    //     throttledSaveToServer.cancel();
    // }

    return (
                <div>
            {console.log(props)}
            <TextInput
                source="yourmom"
            />
            
                    
                </div>
               

    );
    


}

// const mapStateToProps = state => ({
//     content: state.content
// })


export default TinyEditor;
// export default connect(mapStateToProps, { createArticle })(TinyEditor);