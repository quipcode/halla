import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";

import { Admin, Resource } from 'react-admin';
import { ArticleList, ArticleEdit, ArticleCreate } from './articles'
import {authProvider} from "./authProvider";
import dataProvider from "./dataProvider";
// import history from './utils/history'
import "./index.css";
import { Provider } from 'react-redux';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostCreate } from './posts';
import { UserList } from './users'
// import { AppContainer } from 'react-hot-loader';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
// import createHistory from 'history';
// import { createBrowserHistory, History } from 'history';
import { createBrowserHistory } from 'history';

import { BrowserRouter, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
// import dotenv from 'dotenv';

// dotenv.config()
import { API_ROOT} from './utils/enironmentConstants'


import adminHistory from "./utils/adminHistory";
const history = createBrowserHistory();
import createAdminStore from './store';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');




// const App = () => (

//     // <div>
//     //     <p>hi</p>
//     //     {/* {console.log("big booty britney")} */}

//     //     {console.log(API_ROOT)}
//     // </div>
    
//             <Provider
//                 store={createAdminStore({
//                     authProvider,
//                     dataProvider,
//                     history,
//                 })}>
//         <Admin
//             authProvider={authProvider}
//             dataProvider={dataProvider}
//             history={history}
//             title="Nodus"
//             customRoutes={[
//                 // <Route path="/articles"  element={<ArticleList />} />,
//                 // <Route path="/articles">
//                 //     <ArticleList/>
//                 //     </Route>,
//                 // {(routeProps) => <PostList basePath="/" resource="posts" {...routeProps} />}
//                 // <Route path="/articles" element={(routeProps) => <ArticleList basePath="/" resource="articles" {...routeProps} />}/>

//             ]}
//         >
//             {/* <Resource name="posts" list={PostList} create={PostCreate} icon={PostIcon} /> */}
            
//             <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} />
//             {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
//             <Resource name="users"/>
//         </Admin>
//             </Provider>
    
// );


const App = () => (
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
        history={adminHistory}
            title="Nodus"
        >
            <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} />
            <Resource name="users" />
        </Admin>
    

);


// const App = () => (
    
//         <Provider
//             store={
//                 createAdminStore({
//                     authProvider,
//                     dataProvider,
//                     history,
//                 })
//             } >
//     <Admin
//         authProvider={authProvider}
//         dataProvider={dataProvider}
//         history={history}
//         title="Nodus"
//     >
//         <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} />
//         <Resource name="users" />
//     </Admin>
//     </Provider>
    

// );
export default withRouter((App))
// ReactDOM.render(<App />, document.getElementById("app"));
// ReactDOM.render(withRouter((App)), document.getElementById("app"));

