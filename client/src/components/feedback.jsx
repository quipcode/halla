import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from "yup";

let feedbackTopic = [{ id: 0, name: null }, { id: 1, name: "Overall Site" }, { id: 2, name: "This Page" }, { id: 3, name: "Specific Feature" }]
let feedbackSelectionGenerator = feedbackTopic.map(
    ({ id, name }, key) => key === 0 ? <option disabled defaultValue value={id} key={key}>Provide feedback on...</option> : <option value={id} key={key}>{name}</option> 
)
// const routeComponents = Object.values(routes).map(
//     ({ path, component, privateRoute }, key) =>
//         privateRoute ?
//             <PrivateRoute exact path={path} component={component} key={key} /> :
//             <Route exact path={path} component={component} key={key} />
// );

const validationSchema = Yup.object({
    feedback: Yup.string().required("Required"),
    title: Yup.string().required("Required"),

    feedbackOn: Yup.string()

        .oneOf(

            ['1', '2', '3'],

            'Invalid Job Type'

        )

        .required('Required'),

})


const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            {/* <label className="form-check-label" htmlFor={props.id || props.name}>{label}</label> */}
            <select className={"form-select"} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyRadios = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return(
     
        <div>
            <label className="form-check-label" htmlFor={props.id || props.name}>{label}</label> 
            <div className="form-check form-check-inline m-2">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="asAnon" value="anon" defaultChecked/>
            <label className="form-check-label" htmlFor="asAnon">Anonymous</label>
            </div>
            { props.user ? 
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="asUser" value={props.user} />
            <label className="form-check-label" htmlFor="asUser">As {props.user}</label>
            </div> 
            :    
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="asUser" value="asUser" disabled/>
            <label className="form-check-label" htmlFor="inlineRadio3">As User</label>
            </div>}
     
         
        </div> 
    )
}
const FeedBack = (props) => {


    return (
        

        <div className="container">
            <div className="col-md-12 ">
                <div className="card">
                    <article className="card-body">
                        <Formik
                            initialValues={{ title: '', feedback: '', feedbackOn: "0", asWhom:"" }}
                            onSubmit={(values, { setSubmitting }) => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);

                                // setTimeout(() => {

                                //     alert(JSON.stringify(values, null, 2));

                                //     setSubmitting(false);

                                // }, 400);

                            }}
                        >
                            
                            <Form className="feedback-form">
                            <h3> Feedback Form </h3>
                            <fieldset>
                            <div>
                                {/* <label>Provide feedback as</label> */}
                                    <MyRadios user={props.auth.username} label={"Provide feedback as: "}/>
                                    </div>
                                </fieldset>
                                <fieldset className="form-group feedback_form_fields">
                                    <MySelect   label="Feedback On: " name="feedbackOn">
                                        {feedbackSelectionGenerator}

                                    </MySelect>
                                    {/* <label htmlFor="feedbackOn">Feedback On:
                                        <Field name="feedbackOn" component="select">
                                            {feedbackSelectionGenerator}
                                        </Field>
                                    </label> */}
                                </fieldset>
                           
                                <fieldset className="form-group feedback_form_fields">
                                    {/* <label htmlFor="title">Title</label> */}
                                    <Field className={"form-control"} name="title" placeholder="Title" />
                                </fieldset>
                                {/* <div role="group" aria-labelledby="my-radio-group">
                                    <label>
                                        <Field type="radio" name="picked" value="asUser" disabled />
                                        As User
                                    </label>
                                    <label>
                                        <Field type="radio" name="picked" value="anon" />
                                        Anonymous
                                    </label>
                                </div> */}
                          
                    
                               <div>
                               <fieldset>
                                    {/* <label htmlFor="feedback">FeedBack</label> */}
                                    {/* <Field name="feedback" component="textarea" rows="7" ></Field> */}
                                    <Field placeholder={"Feedback"} className={'form-control' } name="feedback" component="textarea" rows="7" />
                                </fieldset>
                                   </div>
                                
                                    
                                    <div className="text-center" role="toolbar" aria-label="Toolbar with button groups">
                                        <div className="btn-group m-2" role="group" aria-label="Second group"><button type="button" className="btn btn-danger">Cancel</button></div>
                                        <div className="btn-group" role="group" aria-label="Third group"><button className="btn btn-primary" type="submit">Submit</button></div>
                                    </div>
                                
                                <hr className="my-4" />
                            </Form>
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