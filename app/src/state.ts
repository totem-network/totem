// TODO: export store from index.tsx
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { Map } from 'immutable';
import {
    AnyAction,
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import DevTools from './app/containers/DevTools';
import createReducers, { IImmutableState } from './reducers';
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

export const reducers = createReducers(history);

export const store = createStore<IImmutableState, AnyAction, {}, {}>(
    reducers,
    initialState,
    enhancer,
);
