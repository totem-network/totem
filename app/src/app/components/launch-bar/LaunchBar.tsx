import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import {
    IStartApplicationAction,
} from 'applications';
import React, { Component, ComponentType  } from 'react';
import App from './App';

interface ILaunchBarProps {
    startApplication: (application: string) => IStartApplicationAction;
}

interface ILaunchBarState {}

type LaunchBarProps = ILaunchBarProps & WithStyles;

class LaunchBar extends Component<LaunchBarProps, ILaunchBarState> {

    constructor(props: LaunchBarProps, context?: any) {
        super(props, context);

        this.launchApplication = this.launchApplication.bind(this);
    }

    public launchApplication(application: string) {
        const { startApplication } = this.props;

        startApplication(application);
    }

    public render() {
        const {
            container,
            launchBar,
        } = this.props.classes;

        return (
            <nav
                className={launchBar}
            >
                <div className={container}>
                    <div>
                        <App launchApplication={this.launchApplication} />
                    </div>
                </div>
            </nav>
        );
    }

}

const style: StyleRules = {
    container: {
        margin: '0 auto',
        width: '80%',
    },
    launchBar: {
        background: 'rgba(0, 0, 0, 0.2)',
        bottom: '5vw',
        height: '20vh',
        left: '5vw',
        margin: 0,
        padding: 0,
        position: 'absolute',
        width: '90vw',
    },
};

export default withStyles(style)(LaunchBar) as ComponentType<ILaunchBarProps>;
