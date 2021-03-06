import LoggedIn from 'account/components/LoggedIn';
import NotLoggedIn from 'account/components/NotLoggedIn';
import React, { lazy, Suspense } from 'react';
import Login from './Login';
import Branding from './login/Branding';

interface ILayoutProps {}

const DesktopLoadable = lazy(() => import("./Desktop"));

const Layout = ({}: ILayoutProps) => {
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
};

export default Layout;
