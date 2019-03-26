import * as Sentry from '@sentry/browser';
import { rootResolver, schema } from 'api';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import DevTools from './app/containers/DevTools';
import startupSaga, { sagaMiddleware } from './sagas';
import { history, store } from './state';

if (process.env.NODE === 'production') {
    Sentry.init({
        dsn: 'https://cb5c94cc3f014e19a13e6d91fd57814b@sentry.io/1408216',
    });
}

if ('serviceWorker' in navigator && process.type !== 'renderer') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

/*let sagaTask = */
sagaMiddleware.run(startupSaga);

const apolloLink = new SchemaLink({
    rootValue: rootResolver,
    schema,
});

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: apolloLink,
});

const render = (AppComponent: any) => {
    return ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ApolloProvider client={apolloClient}>
                    <div>
                        <AppComponent />
                        {(process.env.NODE !== 'production') ? <DevTools /> : ''}
                    </div>
                </ApolloProvider>
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
