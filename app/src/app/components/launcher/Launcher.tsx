import { makeStyles } from '@material-ui/styles';
import { startApplication } from 'applications/actions/application';
import classNames from 'classnames';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { hideLauncher } from '../../actions/launcher';
import launcherSelector from '../../selectors/launcher';
import App from './App';

interface ILauncherProps {}

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

const Launcher = ({}: ILauncherProps) => {
    const { isVisible } = useSelector(launcherSelector, shallowEqual);

    const dispatch = useDispatch();

    const classes = useStyles();

    const launchApplication = (application: string, manifest?: string) => {
        dispatch(hideLauncher());
        dispatch(startApplication(application, manifest));
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
