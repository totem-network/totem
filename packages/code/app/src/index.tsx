import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import DevTools from './containers/DevTools';
import startupSaga, { sagaMiddleware } from './sagas';
import { history, store } from './state';

/*let sagaTask = */
sagaMiddleware.run(startupSaga);

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
