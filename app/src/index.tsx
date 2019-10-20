import * as Sentry from '@sentry/browser';
import { ConnectedRouter } from 'connected-react-router/immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
// import DevTools from './app/components/DevTools';
import startupSaga, { sagaMiddleware } from './sagas';
import { history, store } from './state';

if (process.env.NODE === 'production') {
    Sentry.init({
        dsn: 'https://cb5c94cc3f014e19a13e6d91fd57814b@sentry.io/1408216',
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

/*let sagaTask = */
sagaMiddleware.run(startupSaga);

const render = (AppComponent: any) => {
    return ReactDOM.render(
        (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <>
                        <AppComponent />
                        {/*(process.env.NODE !== 'production') ? <DevTools /> : ''*/}
                    </>
                </ConnectedRouter>
            </Provider>
        ),
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
