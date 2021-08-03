import React, {useEffect} from 'react';
import routes from '../routes/routes'
import { connect } from 'react-redux';
import { loginUser, logoutUser, registerUser } from '../store/redux/auth/actions';
import { getVerse } from '../store/redux/tadabor/actions';
import alertActions from '../store/redux/alert/actions'
import {withRouter} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import history from '../utils/history';
import { Switch, Route } from 'react-router-dom'
// import {constants} from './utils/constants';

import logo from '../assets/logo.svg';


const mapDispatchToProps = {
    loginUser: () => (loginUser()),
    logoutUser: () => (logoutUser()),
    registerUser: () => (registerUser()),
    getVerse: () => (getVerse())
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

const App = (props) => {
    const alerts = useSelector(state => state.alerts);
    const routeComponents = routes.map(
        ({ path, component, privateRoute }, key) =>
            privateRoute ? <PrivateRoute exact path={path} component={component} key={key} /> :
                <Route exact path={path} component={component} key={key} />);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);
    
    // const isAuthenticated = localStorage.getItem(constants.HALLA_AUTH_USER) || props.auth.isAuthenticated
    const isAuthenticated = localStorage.getItem("hallaAuthUser") || props.auth.isAuthenticated

    function dismiss() {
        dispatch(alertActions.clear());
    }



    return (

        <div className="app">

            {/* <Navbar auth={isAuthenticated} /> */}



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

            {/* <Footer /> */}
        </div>
    );
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))