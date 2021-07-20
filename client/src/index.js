
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/store';
import App from './App';

import history from './utils/history'

const initialState = {};
const store = configureStore(initialState, history);
if (module.hot) {
    module.hot.accept();
}


render((

    <AppContainer>
        <Provider store={store} >
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </AppContainer>
    

), document.getElementById('root'));
