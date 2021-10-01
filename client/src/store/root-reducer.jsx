import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import history from '../utils/history'
import auth from './redux/auth/reducer'
import alerts from './redux/alert/reducer'
import tadabor from './redux/tadabor/reducer'
import content from './redux/content/reducer'

export default function createReducer(asyncReducers) {
    const rootReducer = combineReducers({
        auth,
        alerts,
        tadabor,
        content,
        router: connectRouter(history),
        ...asyncReducers,
    });

    return rootReducer;
}
