import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import history from '../utils/history'
import auth from './redux/auth/reducer'
import alerts from './redux/alert/reducer'
import tadabor from './redux/tadabor/reducer'
import content from './redux/content/reducer'
import allMyContent from './redux/allMyContent/reducer'
import {adminReducer} from 'react-admin'
export default function createReducer(asyncReducers) {
    const rootReducer = combineReducers({
        auth,
        alerts,
        tadabor,
        content,
        allMyContent,
        router: connectRouter(history),
        admin: adminReducer,
        ...asyncReducers,
    });

    return rootReducer;
}
