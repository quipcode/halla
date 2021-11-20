import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";

import { Admin, Resource } from 'react-admin';
import { ArticleList } from './articles'
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import history from './utils/history'
import "./index.css";
import { Provider } from 'react-redux';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostCreate } from './posts';
import { UserList } from './users'
// import { AppContainer } from 'react-hot-loader';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';


import createAdminStore from './store';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
    
    <div>

        {/* <AppContainer> */}
            <Provider
                store={createAdminStore({
                    authProvider,
                    dataProvider,
                    history,
                })}>
                <Admin
                    authProvider={authProvider}
                    dataProvider={dataProvider}
                    history={history}
                    title="Nodus"
                >
                {/* <Resource name="posts" list={PostList} create={PostCreate} icon={PostIcon} />
                <Resource name="users" list={UserList} icon={UserIcon} /> */}
                    <Resource name="articles" list={ArticleList} />
                </Admin>
            </Provider>
        {/* </AppContainer> */}
        

    </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

// export {App};


{/* <AppContainer>
    <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history,
        })}>
    </Provider>
</AppContainer> */}

