import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

interface IAppProps {}

interface IAppState {}

class App extends Component<IAppProps, IAppState> {

    public render() {
        return (
            <div />
        );
    }

}

let exportedApp = App;
if (process.env.NODE !== 'production' && module.hot) {
    exportedApp = hot(module)(App);
}

export default exportedApp;
