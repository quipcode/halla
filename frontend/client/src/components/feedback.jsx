import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from "yup";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

let feedbackTopic = [{ id: 0, name: null }, { id: 1, name: "Overall Site" }, { id: 2, name: "This Page" }, { id: 3, name: "Specific Feature" }]
let feedbackSelectionGenerator = feedbackTopic.map(
    ({ id, name }, key) => key === 0 ? <option disabled defaultValue value={id} key={key}>Provide feedback on...</option> : <option value={id} key={key}>{name}</option> 
)

const validationSchema = Yup.object({
    feedback: Yup.string().required("Feedback is required"),
    title: Yup.string().required("Title is required"),
    feedbackOn: Yup.string()
        .oneOf(
            ['1', '2', '3'],
            'Please specify feedback scope'
        )
        .required('Required')
})


const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <select className={"form-select"} {...field} {...props} />
            {meta.touched && meta.error ? (
                 <ErrorMessage name={field.name} component="div" className="invalid-feedback">{meta.error}</ErrorMessage>
            ) : null}
        </div>
    );
};

const  RadioButtons = (props) => {
    const { label, name, options, user, ...rest } = props
    return (
        <div>
            <label>{label}: </label>
            <Field name={name} >
                {({ field }) => {
                    return options.map(option => {
                        return (
                            <React.Fragment key={option.key} >
                                {option.value == "asUser" ?
                                    <OverlayTrigger overlay={<Tooltip id="tooltip">Please log in to provide feedback as user!</Tooltip>}>
                                    <input
                                        type='radio'
                                        id={option.value}
                                        {...field}
                                        {...rest}
                                        value={option.value}
                                        checked={field.value === option.value}
                                        disabled
                                    /> 
                                   </OverlayTrigger>
                                    :
                                    <input
                                        type='radio'
                                        id={option.value}
                                        {...field}
                                        {...rest}
                                        value={option.value}
                                        checked={field.value === option.value}
                                    />
                                }
                                <label htmlFor={option.value}>{option.key}</label>
                            </React.Fragment>
                        )}
                    )
                }}
            </Field>
            <ErrorMessage component="div" name={name} />
        </div>
    )
}



const FeedBack = (props) => {

    const radioOptions = props.auth.username ? [
        { key: 'Anonymous', value: 'anon' },
        { key: "As " + props.auth.username, value: props.auth.username },
    ] : [
        { key: 'Anonymous', value: 'anon' },
        { key: 'As User', value: 'asUser' },
    ]

    return (
        

        <div className="container">
            <div className="col-md-12 ">
                <div className="card">
                    <article className="card-body">
                        <Formik
                            initialValues={{ title: '', feedback: '', feedbackOn: "0", asWhom:"anon" }}
                            onSubmit={(values, { setSubmitting }) => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }}
                            validationSchema={validationSchema}
                        >
                            {
                                ({ errors, touched }) => (
                            <Form className="feedback-form">
                            <h3> Feedback Form </h3>
                                <fieldset>
                                    <div>
                                        <RadioButtons label={"Provide feedback as"} options={radioOptions} name={"asWhom"} user={"bob"}/>
                                    </div>
                                </fieldset>
                                <fieldset className="form-group feedback_form_fields">        
                                    <MySelect className={'form-control' + (errors.feedbackOn && touched.feedbackOn ? ' is-invalid' : '')}  label="Feedback On: " name="feedbackOn">            
                                        {feedbackSelectionGenerator}
                                    </MySelect>
                                    <ErrorMessage name="feedbackOn" component="div" className="invalid-feedback" />
                                </fieldset>
                                <fieldset className="form-group feedback_form_fields">
                                    <Field className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}  name="title" placeholder="Title" />
                                    <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                </fieldset>                      
                                <fieldset>
                                    <Field placeholder={"Feedback"} t className={'form-control' + (errors.feedback && touched.feedback ? ' is-invalid' : '')} name="feedback" component="textarea" rows="7" />
                                    <ErrorMessage name="feedback" component="div" className="invalid-feedback" />
                                </fieldset> 
                                <div className="text-center" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group m-2" role="group" aria-label="Second group"><button type="button" className="btn btn-danger">Cancel</button></div>
                                    <div className="btn-group" role="group" aria-label="Third group"><button className="btn btn-primary" type="submit">Submit</button></div>
                                </div>
                                <hr className="my-4" />
                            </Form>
                                )
                            }
                        </Formik>
                    </article>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(FeedBack);