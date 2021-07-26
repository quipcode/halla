import { Editor } from '@tinymce/tinymce-react';
import * as React from "react";
import constants from '../utils/constants';
import StatusBar from './statusbar';
import * as _ from "lodash";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'


const validationSchema = yup.object({
    contentTitlePresent: yup.boolean(),
    contentTitle: yup.string().when("contentTitlePresent", {
        is: false,
        then: yup.string().required("Must provide content title to publish")
    }),
    
})


class TinyEditor extends React.Component {

    constructor(props) {
        super(props);

        // Binding to make 'this' work in the callbacks
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.initialState = this.state;
        // Initial state
        this.state = {
            contentTitle: "",
            
            editorContent: '<h2 style="text-align: center;">TinyMCE and React!</h2>',
            displayIsSaving: false
        };

        this.contentTitlePresent = this.state.contentTitle.length > 1 ? true : false
        // Fake async save method to illustrate auto-save functionality
        this.throttledSaveToServer = _.throttle(() => {
            setTimeout(() => {
                console.log("Saved to server", this.state.contentTitle, this.state.editorContent);
                this.debouncedEndSaving();
            }, 500);
        }, 500);

        this.debouncedEndSaving = _.debounce(() => {
            this.setState({ displayIsSaving: false });
        }, 1000);
    }

    save(newPartialState) {
        this.setState({
            ...newPartialState,
            displayIsSaving: true
        }, () => {
            this.throttledSaveToServer();
        });
    }

    handleEditorChange(editorContent) {
        this.save({ editorContent });
    }

    handleNameChange(contentTitle) {
        this.save({ contentTitle });
    }
    componentWillUnmount() {
        this.debouncedEndSaving.cancel();
        this.throttledSaveToServer.cancel();
    }

    handleCancel(e){
        e.preventDefault();
        console.log("cancel button")
        console.log(e)
    }
    handleSave(e){
        console.log("save buttons")
        console.log(e)
    }
    render() {
        return (
            <div className="document-editor">
                <Formik
                    validationSchema={validationSchema}
                
                >
                    {
                        ({ isValid, isSubmitting, errors, touched }) => (
                    <Form>


                        <fieldset className="form-group tinyEditor_form_fields">
                                    <label htmlFor="contentTitle">Content Title</label>
                                    <Field className={'form-control'} type="text" name="contentTitle" placeholder="Content Title" value={this.state.contentTitle} onChange={this.handleNameChange}/>
                                    <ErrorMessage name="contentTitle" component="div" className="invalid-feedback" />
                        </fieldset>
                        <StatusBar
                            displayIsSaving={this.state.displayIsSaving}
                            contentTitle={this.state.contentTitle}
                            onNameChange={this.handleNameChange}
                        />
                                <Editor
                                    apiKey={constants.TINYMCE_API_KEY}
                                    initialValue={content}
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
                                        save_onsavecallback: this.handleSave
                                    }}
                                    onChange={this.handleEditorChange}
                                    onSaveContent={this.handleSave}
                                />

                                <div>
                                    <button disabled={true} type="submit" variant="contained" color="primary">
                                        Submit
                                    </button> &nbsp;
                                    <button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => this.handleSave(this.state)} >Save</button>&nbsp;
                                 
                                    <button variant="contained" color="default" onClick={this.handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                                <div className="cta">
                                    <button
                                        disabled={!isValid || isSubmitting}
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                    </Form>
                        )
                    }
                </Formik>
            </div>
        );
    }

}

export default TinyEditor;