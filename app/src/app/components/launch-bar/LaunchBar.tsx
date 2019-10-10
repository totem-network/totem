import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import {
    IStartApplicationAction,
} from 'applications';
import React from 'react';
import { useWidth } from 'ui';
import { IHideLaunchBarAction } from './../../actions/launchBar';
import App from './App';

interface ILaunchBarProps {
    isVisible: boolean;
    startApplication: (application: string, manifest?: string) => IStartApplicationAction;
}

const useStyles = makeStyles({
    container: {
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '1vw 2.5vw 1vw',
        height: '100%',
        margin: '0 auto',
        maxWidth: '600px',
        width: '100%',
    },
    launchBar: {
        bottom: '5vw',
        height: '10vh',
        left: '5vw',
        margin: 0,
        padding: 0,
        position: 'absolute',
        width: '90%',
    },
});

const LaunchBar = ({
    isVisible,
    startApplication,
}: ILaunchBarProps) => {
    const classes = useStyles();
    const width = useWidth();

    const launchApplication = (application: string, manifest?: string) => {
        startApplication(application, manifest);
    };

    if (!isVisible) {
        return null;
    }

    return isWidthDown('md', width) ?  (
        <nav
            className={classes.launchBar}
        >
            <div className={classes.container}>
                <div>
                    <App launchApplication={launchApplication} />
                </div>
            </div>
        </nav>
    ) : null;
};

export default LaunchBar;
