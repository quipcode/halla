
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { connect } from "react-redux";

import { loginUser } from '../store/redux/auth/actions';
const validationSchema = Yup.object({
    usernameOrEmail: Yup.string().required("Required"),
    password: Yup.string().required("Required")
})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameOrEmail: "",
            password: "",
            invalidCredential: false,
            errorMessage: "",
            failedLogin: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.dismiss = this.dismiss.bind(this)
    }


    componentDidMount() {
        document.title = "Transformare - Login"
    }


    static getDerivedStateFromProps(props, state) {
        if (props.auth.errMess && props.auth.errMess === "Request failed with status code 401") {

            return {
                invalidCredential: true,
                failedLogin: true
            }

        } else if (props.auth.errMess) {

            return {
                errorMessage: props.auth.errMess,
                failedLogin: true
            }

        }
        return null
    }
    onSubmit(values) {
        let { usernameOrEmail } = values


        this.props.loginUser(values)


    }

    handleLoginResponse() {
    }
    dismiss() {
        // need to set prop's errMess to '' b/c getDerivedStateFromProps is perpetually listening...won't get to 'dismiss' w/o setting to empty
        this.props.auth.errMess = ""
        this.setState((state) => {
            return {
                errorMessage: "",
                invalidCredential: false,
                failedLogin: false
            }
        })
    }

    render() {
        let { usernameOrEmail, password } = this.state


        return (
            <div className="container" >
                <div className="row login_form">
                    <aside className="col-lg-7">
                        <div className="card">
                            <article className="card-body">
                                {this.state.invalidCredential && this.state.failedLogin &&
                                    <div className="alert alert-warning alert-dismissible fade show justify-content-center" role="alert">
                                        <strong>Invalid Credentials!</strong> Please review the fields
                                        <button type="button" onClick={this.dismiss} className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>}

                                {this.state.errorMessage.length > 1 && this.state.failedLogin &&
                                    <div className="alert alert-danger alert-dismissible fade show justify-content-center" role="alert">
                                        <strong>Network Error!</strong> Please try again or contact support
                                        <button type="button" onClick={this.dismiss} className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>}
                                <h3 className="card-title mb-4 mt-1">Login</h3>
                                <Formik
                                    onSubmit={(values, { resetForm }) => {
                                        this.onSubmit(values);
                                        resetForm({ values: "" });
                                    }}
                                    initialValues={{ usernameOrEmail, password }}
                                    validationSchema={validationSchema}
                                    validateOnChange={false}
                                    // validateOnBlur={false}
                                    enableReinitialize={true}
                                    className="form-parent"
                                >
                                    {
                                        ({ errors, touched }) => (
                                            <Form className="login-form">


                                                <fieldset className="form-group login_form_fields">
                                                    <label htmlFor="usernameOrEmail">Email/Username</label>
                                                    <Field className={'form-control' + (errors.usernameOrEmail && touched.usernameOrEmail ? ' is-invalid' : '')} type="text" name="usernameOrEmail" placeholder="Email/Username" />
                                                    <ErrorMessage name="usernameOrEmail" component="div" className="invalid-feedback" />
                                                </fieldset>
                                                <fieldset className="form-group login_form_fields">
                                                    <label htmlFor="password">Password</label>
                                                    <Field className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} type="password" name="password" placeholder="******" />
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                </fieldset>
                                                <button className="btn btn-primary" type="submit">Login</button>
                                                <hr className="my-4" />
                                            </Form>
                                        )
                                    }
                                </Formik>
                                <a className="underlineHover" href="/forget">Forgot Password?</a>
                                <p>Don't have an account? Register <a className="underlineHover" href="/register">here</a> </p>
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


export default connect(mapStateToProps, { loginUser })(Login);

