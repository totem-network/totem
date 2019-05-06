import React, { Component, Fragment } from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";

interface IRoutesProps {}

interface IRoutesState {}

const IndexLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'index' */ './index/Index'),
    loading: () => null,
});

const EditorLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'editor' */ './editor/Layout'),
    loading: () => null,
});

class Routes extends Component<IRoutesProps, IRoutesState> {

    public render() {
        return (
            <Switch>
                <Route exact={true} path={'/'} component={IndexLoadable} />
                <Route path={'/:module'} component={EditorLoadable} />
            </Switch>
        );
    }

}

export default Routes;
