import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { IStartApplicationAction } from 'applications';
import classNames from 'classnames';
import React, { Component  } from 'react';
import { IHideLauncherAction } from '../../actions/launcher';
import App from './App';

interface ILauncherProps {
    isVisible: boolean;
    hideLauncher: () => IHideLauncherAction;
    startApplication: (application: string, manifest?: string) => IStartApplicationAction;
}

interface ILauncherState {}

type LauncherProps = ILauncherProps & WithStyles;

class Launcher extends Component<LauncherProps, ILauncherState> {

    constructor(props: LauncherProps, context?: any) {
        super(props, context);

        this.launchApplication = this.launchApplication.bind(this);
    }

    public launchApplication(application: string, manifest?: string) {
        const { hideLauncher, startApplication } = this.props;

        hideLauncher();
        startApplication(application, manifest);
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
};

export default withStyles(style)(Launcher as any);
