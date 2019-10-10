import React from 'react';
import Events from './../components/events/Events';
import Windows from './../containers/applications/Windows';
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
