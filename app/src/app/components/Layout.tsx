import {
    LoggedIn,
    Login,
    NotLoggedIn,
} from 'account';
import React, { Component, lazy, Suspense } from 'react';
import Branding from './login/Branding';

interface ILayoutProps {}

interface ILayoutState {}

const DesktopLoadable = lazy(() => import("./Desktop"));

class Layout extends Component<ILayoutProps, ILayoutState> {

    public render() {
        return (
            <div>
                <LoggedIn>
                    <Suspense fallback={null}>
                        <DesktopLoadable />
                    </Suspense>
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
