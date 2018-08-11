import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { theme } from 'themes';
import IntlProvider from './../containers/Intl';
import Layout from './Layout';

interface IAppProps {}

interface IAppState {}

class App extends Component<IAppProps, IAppState> {

    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <IntlProvider>
                    <Layout />
                </IntlProvider>
            </MuiThemeProvider>
        );
    }

}

let exportedApp = App;
if (process.env.NODE !== 'production' && module.hot) {
    exportedApp = hot(module)(App);
}

export default exportedApp;
