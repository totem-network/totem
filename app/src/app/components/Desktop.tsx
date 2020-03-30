import React from 'react';
import Windows from './../components/applications/Windows';
import Events from './../components/events/Events';
import Gestures from './../components/gestures/Gestures';
import LaunchBar from './../components/launch-bar/LaunchBar';
import Launcher from './../components/launcher/Launcher';
import SideNav from './../components/side-nav/SideNav';
import SystemBar from './../components/system-bar/SystemBar';

interface IDesktopProps {}

const Desktop = ({}: IDesktopProps) => {
    return (
        <>
            <Events />
            <Gestures />
            <Windows />
            <LaunchBar />
            <SideNav />
            <SystemBar />
            <Launcher />
        </>
    );
};

export default Desktop;
