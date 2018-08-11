// TODO: export store from index.tsx
import { createBrowserHistory } from 'history';
import { Map } from 'immutable';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import {
    AnyAction,
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import DevTools from './app/containers/DevTools';
import reducer, { IImmutableState } from './reducers';
import { sagaMiddleware } from './sagas';

export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const initialState = Map({});

let enhancer: any;
if (process.env.NODE !== 'production') {
    enhancer = compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(routerMiddleware),
        DevTools.instrument(),
    );
} else {
    enhancer = compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(routerMiddleware),
    );
}

export const store = createStore<IImmutableState, AnyAction, {}, {}>(
    reducer,
    initialState,
    enhancer,
);
