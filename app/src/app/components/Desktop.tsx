import React from 'react';
import Windows from './../components/applications/Windows';
import Events from './../components/events/Events';
import Gestures from './../containers/Gestures';
import LaunchBar from './../containers/LaunchBar';
import Launcher from './../containers/Launcher';
import SideNav from './../containers/SideNav';

interface IDesktopProps {}

const Desktop = ({}: IDesktopProps) => {
    return (
        <>
            <Events />
            <Gestures />
            <Windows />
            <LaunchBar />
            <SideNav />
            <Launcher />
        </>
    );
};

export default Desktop;
