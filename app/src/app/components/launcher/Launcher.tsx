import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { IHideLauncherAction } from 'applications/actions/launcher';
import classNames from 'classnames';
import React, { Component, ComponentType  } from 'react';

interface ILauncherProps {
    isVisible: boolean;
    hideLauncher: () => IHideLauncherAction;
}

interface ILauncherState {}

type LauncherProps = ILauncherProps & WithStyles;

class Launcher extends Component<LauncherProps, ILauncherState> {

    public render() {
        const { isVisible } = this.props;
        const { launcher, launcherVisible } = this.props.classes;

        // TODO: launcher animation: hide sidenav, fade in from bottom

        const launcherClass = classNames(
            launcher,
            {
                [launcherVisible]: isVisible,
            },
        );

        return (
            <aside
                className={launcherClass}
            >
                Launcher
            </aside>
        );
    }

}

const style: StyleRules = {
    launcher: {
        height: '100%',
        margin: 0,
        padding: 0,
        transform: 'translateX(-102%)',
        transition: 'transform .3s ease-out',
        width: '100%',
        willChange: 'transform',
    },
    launcherVisible: {
        transform: 'none',
    },
};

export default withStyles(style)(Launcher) as ComponentType<ILauncherProps>;
