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
// import { AppContainer } from 'react-hot-loader';


import createAdminStore from './store';

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

