
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/store';
import App from './containers/app';
import main from './styles/main.scss'
import createAdminStore from './store/createAdminStore';
import history from './utils/history'
import authProvider from './store/provider/authProvider.js';
import dataProvider from './store/provider/dataProvider';
import { PostList, PostCreate, PostEdit } from './components/ra/posts';
import { UserList } from './components/ra/users';
// import { AuthContext, DataProviderContext, TranslationProvider, Notification, Sidebar, Menu } from 'react-admin';
import UserIcon from '@material-ui/icons/Group';
import ArticleIcon from '@mui/icons-material/Article';
import { Admin, Resource } from 'react-admin';
import { Switch, Route } from 'react-router-dom';
import AdminApp from './containers/adminApp';
import {ArticleList} from './components/ra/articles'

const initialState = {};
const store = configureStore(initialState, history);
if (module.hot) {
    module.hot.accept();
}


render((

    <AppContainer>
        <Provider
            store={createAdminStore({
                authProvider,
                dataProvider,
                history,
            })}>

            {/* <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                history={history}
                title="My Admin"
            // layout={MyLayout}
            >
                <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
                <Resource name="users" list={UserList} icon={UserIcon} />
                <Resource name="content" list={ArticleList} icon={ArticleIcon} />
            </Admin> */}
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/admin" component={AdminApp} />
                    <Route path="/" component={App} />
                </Switch>
            </ConnectedRouter>
            {/* <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter> */}
            {/* <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/admin" component = {AdminApp}/>
                    <Route path="/" component={App}/>
                </Switch>
            </ConnectedRouter> */}
        </Provider>
    </AppContainer>
    

), document.getElementById('root'));
