import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik'

let feedbackTopic = [{id: 0, name: null}, {id: 1, name:"Overall Site"}, {id:2, name: "This Page"}, {id:3, name: "Specific Feature"} ]
let feedbackSelectionGenerator = feedbackTopic.map(
    ({id, name}, key) => <option value={id} key={key}>{name}</option>
    )
// const routeComponents = Object.values(routes).map(
//     ({ path, component, privateRoute }, key) =>
//         privateRoute ?
//             <PrivateRoute exact path={path} component={component} key={key} /> :
//             <Route exact path={path} component={component} key={key} />
// );
const FeedBack = (props) => {


    return (
        
       <div className="container">
            <div className="col-md-12 ">
            <div className="card">
                    <article className="card-body">
                        <Formik>
                            <Form className="feedback-form">
                                <fieldset className="form-group feedback_form_fields">
                                    <label htmlFor="feedbackOn">Feedback On:
                                        <Field name="feedbackOn" component="select">
                                            {feedbackSelectionGenerator}
                                        </Field>
                                    </label>
                                </fieldset>
                                <fieldset className="form-group feedback_form_fields">
                                    {/* <label htmlFor="title">Title</label> */}
                                    <Field name="title" placeholder="Title" />
                                </fieldset>
                                <div role="group" aria-labelledby="my-radio-group">
                                    <label>
                                        <Field type="radio" name="picked" value="asUser" disabled />
                                        As User
                                    </label>
                                    <label>
                                        <Field type="radio" name="picked" value="anon" />
                                        Anonymous
                                    </label>
                                </div>

                                <fieldset>
                                    <label htmlFor="feedback">FeedBack</label>
                                    <Field name="feedback" component="textarea" rows="7" value={""}></Field>
                                </fieldset>
                                    <button type="button" className="btn btn-danger">Cancel</button>
                                    <button className="btn btn-primary" type="submit">Submit</button>
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