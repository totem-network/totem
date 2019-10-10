import { makeStyles } from '@material-ui/styles';
import { IStartApplicationAction } from 'applications';
import classNames from 'classnames';
import React from 'react';
import { IHideLauncherAction } from '../../actions/launcher';
import App from './App';

interface ILauncherProps {
    isVisible: boolean;
    hideLauncher: () => IHideLauncherAction;
    startApplication: (application: string, manifest?: string) => IStartApplicationAction;
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        left: '20%',
        margin: '0',
        padding: '0',
        position: 'absolute',
        top: '10%',
        width: '60%',
    },
    launcher: {
        backgroundImage: 'url("/images/launcher-background.svg")',
        backgroundSize: 'cover',
        height: '100%',
        margin: 0,
        opacity: 0,
        padding: 0,
        position: 'relative',
        transform: 'translateY(-102%)',
        transition: 'opacity .2s ease-out',
        width: '100%',
        willChange: 'transform',
    },
    launcherVisible: {
        opacity: 1,
        transform: 'none',
    },
});

const Launcher = ({
    isVisible,
    hideLauncher,
    startApplication,
}: ILauncherProps) => {
    const classes = useStyles();

    const launchApplication = (application: string, manifest?: string) => {
        hideLauncher();
        startApplication(application, manifest);
    };

    const launcherClass = classNames(
        classes.launcher,
        {
            [classes.launcherVisible]: isVisible,
        },
    );

    return (
        <aside
            className={launcherClass}
        >
            <div className={classes.container}>
                <App
                    imageUrl={'/images/apps/filesystem_256x256.png'}
                    launchApplication={launchApplication}
                    manifest={'/apps/filesystem.json'}
                    name={'Files'}
                    url={'filesystem'}
                />
                <App
                    imageUrl={'/images/apps/3box_256x256.png'}
                    launchApplication={launchApplication}
                    manifest={'/apps/3box.json'}
                    name={'3Box'}
                    url={'https://3box.io/'}
                />
            </div>
        </aside>
    );
};

export default Launcher;
