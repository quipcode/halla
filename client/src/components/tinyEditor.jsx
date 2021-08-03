import { Editor } from '@tinymce/tinymce-react';
import React, { useCallback, useState, useRef, useEffect} from "react";

import constants from '../utils/constants';
import StatusBar from './statusbar';
import * as _ from "lodash";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function TinyEditor(props){


    const [contentEditor, setContentEditor] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [displayIsSaving, setDisplayIsSaving] = useState(false);
    const [initContentEditor, setInitContentEditor] = useState("");
    const [initContentTitle, setInitContentTitle] = useState("");

    const editor = useRef(null);

    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content, editor);
        setContentEditor(content);
    }

    const handleTitleChange = (event) => {
        console.log(event)
        setContentTitle(event.target.value)
    }




    const handlePublish = (event) => {
        setDisplayIsSaving(true)
        throttledSaveToServer();
        console.log("publish was pressed: ", contentEditor, contentTitle)
        event.preventDefault();
    }
    
    const handleSubmit = (event) => {
        window.alert("whats good w/ u")
        console.log("what up though")
        // event.preventDefault()
        // setDisplayIsSaving(true)
        // throttledSaveToServer();
        // console.log("handle submit was pressed: ", contentEditor, contentTitle)
        
        // console.log("in handle submit")
        // console.log(event)
    }

    const handleCancel = (event) => {
        event.preventDefault();
        console.log("cancel button")
        console.log(event)
    }
    const editorRef = useRef(null);

    const throttledSaveToServer = _.throttle(() => {
        setTimeout(() => {
            console.log("Saved to server", contentTitle, contentEditor);
            debouncedEndSaving();
        }, 500);
    }, 500);

    const debouncedEndSaving = _.debounce(() => {
        setDisplayIsSaving(false)
    }, 1000);


    const componentWillUnmount = () => {
        debouncedEndSaving.cancel();
        throttledSaveToServer.cancel();
    }

    const onButtonClick = () => {
        console.log(editor.current.props.value)
        // setEditorContent(editor.current.props.value);
    };

    return (
        <div className="document-editor">
            <form>

              

                <TextField
                    fullWidth
                    id="contentTitle"
                    name="contentTitle"
                    label="Content Title"
                    value={contentTitle}
                    onChange={handleTitleChange}
                />
                <Editor
                    apiKey={constants.TINYMCE_API_KEY}
                    ref={editor}
                    //initialvalue must be some value...else cursor keeps resetting its position to begining of line on re-render...eyeroll...considered implementing tracking cursor location...but tinymce don't provide typical event.target.selectionstart associatied with events
                    // initialValue=""
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                        selector: 'textarea#full-featured-non-premium',
                        plugins: 'save print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                        imagetools_cors_hosts: ['picsum.photos'],
                        menubar: 'file edit view insert format tools table help',
                        toolbar: ' testBTN save undo redo | bold italic underline strikethrough  | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                        toolbar_sticky: true,
                        autosave_ask_before_unload: true,
                        autosave_interval: '30s',
                        autosave_prefix: '{path}{query}-{id}-',
                        autosave_restore_when_empty: false,
                        autosave_retention: '2m',
                        image_advtab: true,
                        link_list: [
                            { title: 'My page 1', value: 'https://www.tiny.cloud' },
                            { title: 'My page 2', value: 'http://www.moxiecode.com' }
                        ],
                        image_list: [
                            { title: 'My page 1', value: 'https://www.tiny.cloud' },
                            { title: 'My page 2', value: 'http://www.moxiecode.com' }
                        ],
                        image_class_list: [
                            { title: 'None', value: '' },
                            { title: 'Some class', value: 'class-name' }
                        ],
                        importcss_append: true,
                        file_picker_callback: function (callback, value, meta) {
                            /* Provide file and text for the link dialog */
                            if (meta.filetype === 'file') {
                                callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                            }

                            /* Provide image and alt text for the image dialog */
                            if (meta.filetype === 'image') {
                                callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                            }

                            /* Provide alternative source and posted for the media dialog */
                            if (meta.filetype === 'media') {
                                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                            }
                        },
                        templates: [
                            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                        ],
                        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                        height: 600,
                        image_caption: true,
                        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                        noneditable_noneditable_class: 'mceNonEditable',
                        toolbar_mode: 'sliding',
                        contextmenu: 'link image imagetools table',
                        // skin: useDarkMode ? 'oxide-dark' : 'oxide',
                        // content_css: useDarkMode ? 'dark' : 'default',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        
                        
                        setup: function (editor) {
                            editor.ui.registry.addButton("testBTN", {
                                text: "My Button",
                                onAction: onButtonClick
                            });
                        },

                        save_onsavecallback: onButtonClick
                    }}
                    value={contentEditor}
                    onEditorChange={handleEditorChange}
                />

               
            
            </form>
        </div>
    );
    


}

export default TinyEditor;