import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class VerseKey extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            verseKey: "",
            uthmaniText: "",
            translationText: "",
            tafsirText: "",
            uthmaniChecked: true,
            translationChecked: false,
            tafsirChecked: false,
        }
    }

    onSubmit(values) {
        let { verseKey, uthmaniChecked, translationChecked, tafsirChecked } = values
        let reqbody = { verseKey, uthmaniChecked, translationChecked, tafsirChecked }

    }

    dismiss() {
        this.props.quran.errMess = ""
        this.setState((state) => {
            return {
                issueQuran: false,
                errorMessage: ""
            }
        })
    }

    render(){
        let { verseKey, uthmaniChecked, translationChecked, tafsirChecked } = this.state;
        return(
            <div className="container">
                <div className="row tadabor_form">
                    <aside className="col-lg-12">
            <Formik
                onSubmit={(values) => this.onSubmit(values)}
                initialValues={{ verseKey, uthmaniChecked, translationChecked, tafsirChecked }}
                enableReinitialize={true}
                className="form-parent"
            >
                {
                    ({ errors, touched }) => (
                        <Form>
                            <fieldset className="form-group tadabor_form_fields">
                                <label htmlFor="verseKey">Verse Key</label>
                                <Field className={'form-control' + (errors.verseKey && touched.verseKey ? ' is-invalid' : '')} type="text" name="verseKey" placeholder="Verse Key: Provide a valid Quran chapter and verse in the 'chapter:verse' format" />
                                <ErrorMessage name="verseKey" component="div" className="invalid-feedback" />
                            </fieldset>

                            <fieldset className="form-group tadabor_form_fields">
                                <label htmlFor="uthmaniChecked">
                                    <Field type="checkbox" name="uthmaniChecked" />
                                    Uthmani Script
                                </label>
                                <label>
                                    <Field type="checkbox" name="translationChecked" />
                                    Yusuf Ali Translation
                                </label>
                                <label>
                                    <Field type="checkbox" name="tafsirChecked" />
                                    Ibn Kathir Tafsir
                                </label>
                                <button className="btn btn-primary" type="submit">Get Verse</button>
                            </fieldset>

                        </Form>
                    )

                }

            </Formik>
               
                
                </aside>
            </div>
            </div >
        )
    }
}

export default VerseKey;