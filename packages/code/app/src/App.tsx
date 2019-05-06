import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Routes from './components/Routes';
import IntlProvider from './containers/Intl';
import theme from './theme';

interface IAppProps {}

interface IAppState {}

class App extends Component<IAppProps, IAppState> {

    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <IntlProvider>
                    <Routes />
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
