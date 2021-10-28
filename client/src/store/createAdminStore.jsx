import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import {
    adminReducer,
    adminSaga,
    USER_LOGOUT,
} from 'react-admin';
import rootReducer from './root-reducer'
import thunk from 'redux-thunk'
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';

const persistedState = loadState();

export default ({
    authProvider,
    dataProvider,
    history,
}) => {
    const reducer = rootReducer()
    const resettableAppReducer = (state, action) =>
        reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider),
                // add your own sagas here
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers =
        (process.env.NODE_ENV === 'development' &&
            typeof window !== 'undefined' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                trace: true,
                traceLimit: 25,
            })) ||
        compose;

    
    const middlewares = [routerMiddleware(history), thunk, sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const store = createStore(
        resettableAppReducer,
        // { /* set your initial state here */ },
        persistedState,
        composeEnhancers(...enhancers),
    );
    store.subscribe(throttle(() => {
        saveState({
            auth: store.getState().auth,
        });
    }, 1000))
    sagaMiddleware.run(saga);
    return store;
};