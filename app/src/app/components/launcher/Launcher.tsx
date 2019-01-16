import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import {
    IHideLauncherAction,
    IStartApplicationAction,
} from 'applications';
import classNames from 'classnames';
import React, { Component, ComponentType  } from 'react';
import App from './App';

interface ILauncherProps {
    isVisible: boolean;
    hideLauncher: () => IHideLauncherAction;
    startApplication: (application: string) => IStartApplicationAction;
}

interface ILauncherState {}

type LauncherProps = ILauncherProps & WithStyles;

class Launcher extends Component<LauncherProps, ILauncherState> {

    constructor(props: LauncherProps, context?: any) {
        super(props, context);

        this.launchApplication = this.launchApplication.bind(this);
    }

    public launchApplication(application: string) {
        const { hideLauncher, startApplication } = this.props;

        hideLauncher();
        startApplication(application);
    }

    public render() {
        const { isVisible } = this.props;
        const {
            container,
            launcher,
            launcherVisible,
        } = this.props.classes;

        // TODO: launcher animation: hide sidenav, fade in with react spring!!

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
                <div className={container}>
                    <div>
                        <App launchApplication={this.launchApplication} />
                    </div>
                </div>
            </aside>
        );
    }

}

const style: StyleRules = {
    container: {
        margin: '0 auto',
        width: '80%',
    },
    launcher: {
        backgroundImage: 'url("/images/launcher-background.svg")',
        backgroundSize: 'cover',
        height: '100%',
        margin: 0,
        opacity: 0,
        padding: 0,
        transform: 'translateY(-102%)',
        transition: 'opacity .2s ease-out',
        width: '100%',
        willChange: 'transform',
    },
    launcherVisible: {
        opacity: 1,
        transform: 'none',
    },
};

export default withStyles(style)(Launcher) as ComponentType<ILauncherProps>;
