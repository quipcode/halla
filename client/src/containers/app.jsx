import React, {useEffect, useState} from 'react';
import routes from '../routes/routes'
import { connect } from 'react-redux';
import { loginUser, logoutUser, registerUser, getSelf } from '../store/redux/auth/actions';
import { createArticle} from '../store/redux/content/actions'
import { getAllMyContent} from '../store/redux/allMyContent/actions'
import { getVerse } from '../store/redux/tadabor/actions';
import alertActions from '../store/redux/alert/actions'
import {withRouter} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { useSelector, useDispatch } from 'react-redux';
import history from '../utils/history';
import { Switch, Route } from 'react-router-dom';
import NavBar  from '../components/navbar';
// import {constants} from './utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createTheme } from '@material-ui/core/styles';
import Footer from '../components/footer'
import logo from '../assets/logo.svg';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import defaultMessages from 'ra-language-english';
import { AuthContext, DataProviderContext, TranslationProvider, Notification, Sidebar, Menu } from 'react-admin';
import { Admin, Resource } from 'react-admin';
import authProvider from '../store/provider/authProvider'
import dataProvider from '../store/provider/dataProvider'
// import restProvider from 'ra-data-simple-rest';
import withContext from 'recompose/withContext';
import PropTypes from "prop-types";
// import MyLayout from '../components/MyLayout';
import CustomLayout from '../components/CustomLayout'
import { PostList, PostEdit, PostCreate } from '../components/posts';
import PostIcon from '@material-ui/icons/Book';
import { UserList } from '../components/users';
import { ArticleList } from '../components/article';
import UserIcon from '@material-ui/icons/Group';
import  MyLayout  from '../components/layout/themeLayout'


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

// const dataProvider = restProvider('http://path.to.my.api/');
// const dataProvider = restProvider('https://jsonplaceholder.typicode.com');

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale !== 'en') {
        return messages[locale];
    }
    return defaultMessages;
});
const theme = createTheme();
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

            <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                history={history}
                title="My Admin"
                // layout={MyLayout}
            >
                <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
                <Resource name="users" list={UserList} icon={UserIcon} />
                <Resource name="articles" list={ArticleList}/>
            </Admin>
            

            {/* <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                history={history}
                title="My Admin"
                // layout={CustomLayout}
            >
                <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
                
            </Admin> */}

            {/* <AuthContext.Provider value={authProvider}>
                <DataProviderContext.Provider value={dataProvider}>
                    <TranslationProvider
                        locale="en"
                        i18nProvider={i18nProvider}
                    >
                        <ThemeProvider theme={theme}>
                            <Resource name="posts" intent="registration" />
                            <Resource name="comments" intent="registration" />
                            <Resource name="users" intent="registration" />
                            <AppBar position="static" color="default">
                                <Toolbar>
                                    <Typography variant="h6" color="inherit">
                                        My admin
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            
                            <ConnectedRouter history={history}>
                                <MyLayout />    
                                <Switch>
                                    <Route exact path="/" component={Dashboard} />
                                    <Route exact path="/posts" render={(routeProps) => <PostList hasCreate resource="posts" basePath={routeProps.match.url} {...routeProps} />} />
                                    <Route exact path="/posts/create" render={(routeProps) => <PostCreate resource="posts" basePath={routeProps.match.url} {...routeProps} />} />
                                    <Route exact path="/posts/:id" render={(routeProps) => <PostEdit hasShow resource="posts" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                                    <Route exact path="/posts/:id/show" render={(routeProps) => <PostShow hasEdit resource="posts" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                                    <Route exact path="/comments" render={(routeProps) => <CommentList hasCreate resource="comments" basePath={routeProps.match.url} {...routeProps} />} />
                                    <Route exact path="/comments/create" render={(routeProps) => <CommentCreate resource="comments" basePath={routeProps.match.url} {...routeProps} />} />
                                    <Route exact path="/comments/:id" render={(routeProps) => <CommentEdit resource="comments" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                                    <Route exact path="/users" render={(routeProps) => <UsersList hasCreate resource="users" basePath={routeProps.match.url} {...routeProps} />} />
                                    <Route exact path="/users/create" render={(routeProps) => <UsersCreate resource="users" basePath={routeProps.match.url} {...routeProps} />} />
                                    <Route exact path="/users/:id" render={(routeProps) => <UsersEdit resource="users" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                                </Switch>
                            </ConnectedRouter>
                            <Notification />
                        </ThemeProvider>
                    </TranslationProvider>
                </DataProviderContext.Provider>
            </AuthContext.Provider>*/}

            {/* <AuthContext.Provider value={authProvider}>
                
                <DataProviderContext.Provider value={dataProvider}>
                    
                    <TranslationProvider
                        locale="en"
                        i18nProvider={i18nProvider}
                    >
                        <ThemeProvider theme={theme}>
                            <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
                            <AppBar title={"hi"} open={false}>
                                <Toolbar>
                                    <Typography variant="h6" color="inherit">
                                        My admin
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <Sidebar >
                                <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
                            </Sidebar>
                            <Notification />
                            <ConnectedRouter history={history}>
                                <Switch>
                                    {routeComponents}
                                </Switch>
                            </ConnectedRouter>
                        </ThemeProvider>
                      
                        
                    </TranslationProvider>
                </DataProviderContext.Provider>
            </AuthContext.Provider> */}





            {/* <NavBar props={props} />

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

            <Footer /> */}
        </div>
    );
}


// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
export default 
    connect(mapStateToProps, mapDispatchToProps)(App);

// export default withContext({authProvider: PropTypes.object,}, () =>({ authProvider }))(App);