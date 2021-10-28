import React, {useEffect, useState} from 'react';
import routes from '../routes/routes'
import { connect } from 'react-redux';
import { loginUser, logoutUser, registerUser, getSelf } from '../store/redux/auth/actions';
import { createArticle} from '../store/redux/content/actions'
import { getAllMyContent} from '../store/redux/allMyContent/actions'
import { getVerse } from '../store/redux/tadabor/actions';
import alertActions from '../store/redux/alert/actions'
import {withRouter} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import history from '../utils/history';
import { Switch, Route } from 'react-router-dom';
import NavBar  from '../components/navbar';
// import {constants} from './utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Footer from '../components/footer'
import logo from '../assets/logo.svg';


const mapDispatchToProps = {
    loginUser: () => (loginUser()),
    logoutUser: () => (logoutUser()),
    registerUser: () => (registerUser()),
    getVerse: () => (getVerse()),
    createArticle: () => (createArticle()),
    getSelf: () => (getSelf()),
    getAllMyContent: () => (getAllMyContent())
    // currentUsername: () => (currentUsername())
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
        content: state.content,
        allMyContent: state.allMyContent
    }
}

const App = (props) => {
    const alerts = useSelector(state => state.alerts);
    const [currentUser, setCurrentUser] = useState(props.auth.username);
    let routeComponents = 
        Object.values(routes).map(({
            title,
            component: Component,
            path,
            exact,
        }, idx) => {
            return (
                <Route
                    key={idx}
                    path={path}
                    exact={exact}
                    render={(props) => <Component {...props} title={title} />}
                />
            )
        })

    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    function dismiss() {
        dispatch(alertActions.clear());
    }
  

    return (
        <div className="app">

            <NavBar props={props} />

            <div className="body-content">
                {
                    alerts.message &&
                    <div className={`alert  ${alerts.type} alert-dismissible alertCenter fade show`} id="alertCenter" role="alert">
                        <strong> {alerts.message}!</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={dismiss}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                }

                <Switch>
                    {routeComponents}
                </Switch>
            </div>

            <Footer />
        </div>
    );
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))