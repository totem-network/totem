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
import { createLogger } from 'redux-logger';
import DevTools from './app/containers/DevTools';
import reducer, { IImmutableState } from './reducers';
import { sagaMiddleware } from './sagas';

const initialState = Map({});

export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const reduxLoggerMiddleware = createLogger({
    // ...options
});

let enhancer: any;
if (process.env.NODE !== 'production') {
    enhancer = compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(routerMiddleware),
        applyMiddleware(reduxLoggerMiddleware),
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
