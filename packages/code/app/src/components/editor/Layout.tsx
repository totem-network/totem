import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";
import Navigation from './Navigation';

interface ILayoutProps {
    match: any;
}

interface ILayoutState {}

const ThemeLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'index' */ '../theme/View'),
    loading: () => null,
});

const ActionsLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'index' */ '../actions/View'),
    loading: () => null,
});

class Layout extends Component<ILayoutProps, ILayoutState> {

    public render() {
        const { match: { params: { module } } } = this.props;

        return (
            <>
                <Navigation module={module} />
                <Switch>
                    <Route path={'/theme/:category?'} component={ThemeLoadable} />
                    <Route path={'/actions/:category?'} component={ActionsLoadable} />
                </Switch>
            </>
        );
    }

}

export default Layout;
