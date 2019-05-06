import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";

interface IComponentsProps {
    themeOptions: ThemeOptions;
}

interface IComponentsState {}

const TypographiesLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'theme-typographies' */ './components/Typographies'),
    loading: () => null,
});

const ComponentsLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'theme-components' */ './components/Components'),
    loading: () => null,
});

class Components extends Component<IComponentsProps, IComponentsState> {

    public render() {
        const {
            themeOptions,
        } = this.props;

        const theme = createMuiTheme(themeOptions);

        return (
            <MuiThemeProvider theme={theme}>
                <Switch>
                    <Route exact={true} path={'/theme'} />
                    <Route path={'/theme/typography'} component={TypographiesLoadable} />
                    <Route path={'/theme/palette'} component={ComponentsLoadable} />
                    <Route path={'/theme/misc'} component={ComponentsLoadable} />
                </Switch>
            </MuiThemeProvider>
        );
    }

}

export default Components;
