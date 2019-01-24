import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidthProps } from '@material-ui/core/withWidth';
import {
    IStartApplicationAction,
} from 'applications';
import React, { Component, ComponentType  } from 'react';
import { IHideLaunchBarAction } from './../../actions/launchBar';
import App from './App';

interface ILaunchBarProps {
    isVisible: boolean;
    startApplication: (application: string, manifest?: string) => IStartApplicationAction;
}

interface ILaunchBarState {}

type LaunchBarProps = ILaunchBarProps & WithStyles & WithWidthProps;

class LaunchBar extends Component<LaunchBarProps, ILaunchBarState> {

    constructor(props: LaunchBarProps, context?: any) {
        super(props, context);

        this.launchApplication = this.launchApplication.bind(this);
    }

    public launchApplication(application: string, manifest?: string) {
        const { startApplication } = this.props;

        startApplication(application, manifest);
    }

    public render() {
        const { isVisible, width } = this.props;

        const {
            container,
            launchBar,
        } = this.props.classes;

        if (!isVisible) {
            return null;
        }

        return isWidthDown('md', width) ?  (
            <nav
                className={launchBar}
            >
                <div className={container}>
                    <div>
                        <App launchApplication={this.launchApplication} />
                    </div>
                </div>
            </nav>
        ) : null;
    }

}

const style: StyleRules = {
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
};

export default withStyles(style)(
    withWidth()(LaunchBar) as ComponentType<ILaunchBarProps & WithStyles>,
) as ComponentType<ILaunchBarProps>;
