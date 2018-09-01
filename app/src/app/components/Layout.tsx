import {
    LoggedIn,
    Login,
    NotLoggedIn,
} from 'account';
import React, { Component, ComponentType, Fragment } from 'react';
import { Map as LoadableMap } from 'react-loadable';
import Branding from './login/Branding';

interface ILayoutProps {}

interface ILayoutState {}

const DesktopLoadable = LoadableMap({
    loader: {
        Gestures: () => import(/* webpackChunkName: 'gestures' */ './../containers/Gestures'),
        SideNav: () => import(/* webpackChunkName: 'side-nav' */ './../containers/SideNav'),
        Windows: () => import(/* webpackChunkName: 'windows' */ './../containers/applications/Windows'),
    },
    loading: () => null,
    render: (loaded, props) => {
        const GesturesContainer = loaded.Gestures.default as any;
        const SideNavContainer = loaded.SideNav.default as any;
        const WindowsContainer = loaded.Windows.default as any;

        return (
            <Fragment>
                <GesturesContainer />
                <WindowsContainer />
                <SideNavContainer />
            </Fragment>
        );
    },
});

class Layout extends Component<ILayoutProps, ILayoutState> {

    public render() {
        return (
            <div>
                <LoggedIn>
                    <DesktopLoadable />
                </LoggedIn>
                <NotLoggedIn>
                    <Login />
                    <Branding />
                </NotLoggedIn>
            </div>
        );
    }

}

export default Layout;
