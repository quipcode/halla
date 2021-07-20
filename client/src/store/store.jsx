import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './root-reducer'
import thunk from 'redux-thunk'

export default function configureStore(initialState = {}, history){
    let composeEnhancers = compose;
    
    const middlewares = [routerMiddleware(history), thunk];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(
        rootReducer(),
        initialState,
        composeEnhancers(...enhancers),
    );

    
    store.injectedReducers = {};
    

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./root-reducer', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}