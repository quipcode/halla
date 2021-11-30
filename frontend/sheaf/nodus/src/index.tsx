import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
// import {App} from './App'
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from 'react-router-dom';

// ReactDOM.render(<App/>, document.getElementById("app"));
import React from "react";
import ReactDOM, { render } from 'react-dom';
import createAdminStore from './store';
import { authProvider } from "./authProvider";
import dataProvider from "./dataProvider";
import App from './App';
// import history from './utils/history'
// const createHistory = require("history").createBrowserHistory
// const history = createHistory();

import { createHashHistory } from 'history';
const history = createHashHistory(
    {
        basename: '/admin'
    }
);

// import("./App");

// render(
//     <AppContainer>
//     </AppContainer>, 

    
// )

// render( (<App/>), document.getElementById("App"));
render((<AppContainer>
    
        <Provider
            store={createAdminStore({
                authProvider,
                dataProvider,
                history,
            })}>
                <App/>
        </Provider>
        
     
     </AppContainer>), document.getElementById("app"));