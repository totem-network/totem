import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import DevTools from './app/containers/DevTools';
import startupSaga, { sagaMiddleware } from './sagas';
import { history, store } from './state';

if ('serviceWorker' in navigator && process.type !== 'renderer') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

let sagaTask = sagaMiddleware.run(startupSaga);

const render = (AppComponent: any) => {
    return ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <AppComponent />
                    {(process.env.NODE !== 'production') ? <DevTools /> : ''}
                </div>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('app'),
    );
};

render(App);

if (process.env.NODE !== 'production' && module.hot) {
    /*module.hot.accept('./app/components/App', async () => {
        const nextAppComponent = await import('./app/components/App');
        render(nextAppComponent);
    });*/

    /*module.hot.accept('./reducers', async () => {
        const nextReducer = await import('./reducers');
        store.replaceReducer(nextReducer.default);
    });*/

    // TODO: does it work for lazy loaded sagas?
    /*module.hot.accept('./sagas', async () => {
        const nextSaga = await import('./sagas');
        sagaTask.cancel();
        sagaTask.done.then(() => {
            sagaTask = sagaMiddleware.run(nextSaga.default);
        });
    });*/
}
