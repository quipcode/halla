import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import constants from '../utils/constants.js';

import {connect} from 'react-redux'
import {registerUser, loginUser} from '../store/redux/auth/actions'

const validationSchema = Yup.object({
    username: Yup.string()
        .trim()
        .matches(/^[a-z0-9]+$/i, 'Username must be in an alphanumeric format')
        .required("Username is Required"),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters')
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            issueRegistration: false,
            failedLogin: false,
            errorMessage: "",
            successRegistration: null
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.dismiss = this.dismiss.bind(this)
    }

    componentDidMount() {
        // document.title = constants.REGISTER_TITLE
        document.title = "Halla - Register"
    }

    onSubmit(values) {

        let { username, email, password } = values
        let reqBody = { username, email, password }

        this.props.registerUser(reqBody)
    }

    dismiss() {
        this.props.auth.errMess = ""
        this.setState((state) => {
            return {
                issueRegistration: false,
                errorMessage: ""
            }
        })
    }
    render() {
        let { username, email, password, passwordConfirmation } = this.state

        return (
            <div className="container">
                <div className="row registration_form">
                    <aside className="col-lg-7">
                        <div className="card">
                            <article className="card-body">

                                {/* handle successful registration but failed login */}
                                {this.state.errorMessage.length > 1 && this.state.failedLogin &&
                                    <div className="alert alert-success alert-dismissible fade show justify-content-center" role="alert">
                                        <strong>Login Error!</strong> You have been registered but we are unable to log you in at this time. Please login on our <a className="underlineHover" href="/login">login page</a>
                                        <p />
                                        <strong>Error Message:</strong> {this.state.errorMessage}
                                        <button type="button" onClick={this.dismiss} className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>}


                                {/* handle failed registration due to non-unique username/email */}
                                {this.state.errorMessage.length > 1 && this.state.issueRegistration && (this.state.errorMessage == "Username is already taken!" || this.state.errorMessage == "Email Address already in use!") &&
                                    <div className="alert alert-warning alert-dismissible fade show justify-content-center" role="alert">
                                        <strong>Registration Error!</strong>
                                        <p> {this.state.errorMessage} {`\n`}Please ensure unique credentials </p>
                                        <button type="button" onClick={this.dismiss} className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>}


                                {/* handle failed registration due to downed service */}
                                {this.state.errorMessage === 'Network Error' && this.state.issueRegistration &&
                                    <div className="alert alert-danger alert-dismissible fade show justify-content-center" role="alert">
                                        <strong>Network Error!</strong> Please try again or contact support
                                        <button type="button" onClick={this.dismiss} className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>}
                                <h3 className="card-title mb-4 mt-1"> Registration</h3>
                                <Formik
                                    onSubmit={(values) => this.onSubmit(values)}
                                    initialValues={{ username, email, password, passwordConfirmation }}
                                    validationSchema={validationSchema}
                                    validateOnChange={false}
                                    enableReinitialize={true}
                                    className="form-parent"
                                >
                                    {
                                        ({ errors, touched }) => (
                                            <Form>
                                                <fieldset className="form-group registration_form_fields">
                                                    <label htmlFor="username">Username</label>
                                                    <Field className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} type="text" name="username" placeholder="Username" />
                                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                                </fieldset>

                                                <fieldset className="form-group registration_form_fields">
                                                    <label htmlFor="email">Email</label>
                                                    <Field className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} type="email" name="email" placeholder="Email" />
                                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                </fieldset>
                                                <fieldset className="form-group registration_form_fields">
                                                    <label htmlFor="password">Password</label>
                                                    <Field className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} type="password" name="password" placeholder="******" />
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                </fieldset>
                                                <fieldset className="form-group registration_form_fields">
                                                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                                                    <Field className={'form-control' + (errors.passwordConfirmation && touched.passwordConfirmation ? ' is-invalid' : '')} type="password" name="passwordConfirmation" placeholder="******" />
                                                    <ErrorMessage name="passwordConfirmation" component="div" className="invalid-feedback" />
                                                </fieldset>
                                                <button className="btn btn-primary" type="submit">Register</button>
                                                <hr className="my-4" />
                                            </Form>
                                        )
                                    }
                                </Formik>
                                <p>Already have an account? Login <a className="underlineHover" href="/login">here</a> </p>
                            </article>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { registerUser, loginUser })(Register);