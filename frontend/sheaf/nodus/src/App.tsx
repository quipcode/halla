import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";

import { Admin, Resource } from 'react-admin';
import { ArticleList, ArticleEdit, ArticleCreate } from './articles'
import {authProvider} from "./authProvider";
import dataProvider from "./dataProvider";
import "./index.css";
import { Provider } from 'react-redux';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostCreate } from './posts';
import { UserList } from './users'
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';


import { BrowserRouter, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { API_ROOT} from './utils/enironmentConstants'


import adminHistory from "./utils/adminHistory";

import createAdminStore from './store';

const App = () => (
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
        history={adminHistory}
            title="Nodus"
        >
            <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} />
            <Resource name="users" />
            <Resource name="sections"/>
            <Resource name="articlesections" />
        </Admin>
    

);


export default App

