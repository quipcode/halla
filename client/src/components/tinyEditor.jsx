import { Editor } from '@tinymce/tinymce-react';
import React, { useCallback, useState} from "react";
import constants from '../utils/constants';
import StatusBar from './statusbar';
import * as _ from "lodash";
import { useFormik } from 'formik';
// import { formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { green, orange, yellow } from '@material-ui/core/colors';



// const validationSchema = yup.object({
//     email: yup
//         .string('Enter your email')
//         .email('Enter a valid email')
//         .required('Email is required'),
//     password: yup
//         .string('Enter your password')
//         .min(8, 'Password should be of minimum 8 characters length')
//         .required('Password is required'),
// });

const validationSchema = yup.object({
    contentTitlePresent: yup.boolean(),
    contentTitle: yup.string().when("contentTitlePresent", {
        is: true,
        then: yup.string().required("Must provide content title to publish"),
        otherwise: yup.string()
    })
})



// class TinyEditor extends React.Component{
function TinyEditor(){
    // constructor(){
    //     super();
    //     this.state={
    //         contentTitle: ""
    //     }
        
    // }
    // const [contentTitle, setContentTitle] = useState("");
    // const [displayIsSaving, setDisplayisSaving] = useState(false);
    // const [editorContent, setEditorContent] = useState("");

    const [state, setState] = useState({ contentTitle: "", editorContent: "<p>hi</p>", displayIsSaving: false });
    // const INITIAL_STATE = { a: false, b: false, c: false, d: false };
    // const [state, setState] = useState(INITIAL_STATE);
    // const [state, setstate] = useState({
    //     Name: 'Hamza',
    //     Status: 'Comitted'
    // })


    // function save(event) {
        
        
    // }

    function save(event) {
        console.log("event is ")
        console.log(event)
        
        // setState(prevState => ({ ...prevState, [name]: value }));
    }

    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    const handleChange = (e) => {
      
        const { name, value } = e.target
        console.log(name, value)
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    console.log("love life")
    console.log(state.editorContent)
  

    // save(newPartialState) {
    //     this.setState({
    //         ...newPartialState,
    //         displayIsSaving: true
    //     }, () => {
    //         this.throttledSaveToServer();
    //     });
    // }

    const throttledSaveToServer = _.throttle(() => {
        setTimeout(() => {
            console.log("Saved to server", contentTitle, editorContent);
            debouncedEndSaving();
        }, 500);
    }, 500);

    const debouncedEndSaving = _.debounce(() => {
        setDisplayisSaving(true)
        // this.setState({ displayIsSaving: false });
    }, 1000);
    const handleEditorChange = (editorContent) => {

        save({editorContent});
    }

    const handleNameChange = (contentTitle) => {
        console.log("in handlenamechange and I am cotnentTitle = " + contentTitle)
        if (contentTitle.length > 0) {
            this.state.contentTitlePresent = true

        }
        this.save({ contentTitle });
    }
    const componentWillUnmount = () => {
        debouncedEndSaving.cancel();
        throttledSaveToServer.cancel();
    }

    const handleCancel = (e) =>{
        e.preventDefault();
        console.log("cancel button")
        console.log(e)
    }
    const handleSave = (e) =>{
        console.log("save buttons")
        console.log(e)
    }

    return (
        <div className="document-editor">
            <form>
                <TextField
                    fullWidth
                    id="contentTitle"
                    name="contentTitle"
                    label="Content Title"
                    inputRef={(input) => save(input)}
                    onChange={handleChange}
                />
               
                <Editor
                    apiKey={constants.TINYMCE_API_KEY}
                    initialValue={state.editorContent}
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                        selector: 'textarea#full-featured-non-premium',
                        plugins: 'save print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                        imagetools_cors_hosts: ['picsum.photos'],
                        menubar: 'file edit view insert format tools table help',
                        toolbar: 'save undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
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
                        save_onsavecallback: {handleSave}
                    }}
                    onChange={handleEditorChange}
                    onSaveContent={handleSave}
                />
           
                <Button color="secondary" variant="contained" type="submit" disabled={!state.contentTitle} onClick={() => { alert('publish clicked') }}>
                    Publish
                </Button>
                <Button color="primary" variant="contained" type="submit" onClick={() => { alert('submit clicked') }}>
                    Save
                </Button>
                <Button color="default" variant="contained" type="reset" onClick={() => { alert('cancel clicked') }}>
                    Cancel
                </Button>
            </form>
        </div>
    )


}

export default TinyEditor;