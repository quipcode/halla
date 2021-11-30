import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import React from "react";
import { render } from 'react-dom';
import createAdminStore from './store';
import { authProvider } from "./authProvider";
import dataProvider from "./dataProvider";
import App from './App';


import { createHashHistory } from 'history';
const history = createHashHistory(
    {
        basename: '/admin'
    }
);

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