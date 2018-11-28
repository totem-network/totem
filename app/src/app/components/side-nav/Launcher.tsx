import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthUp, WithWidthProps } from '@material-ui/core/withWidth';
import Apps from '@material-ui/icons/Apps';
import { IShowLauncherAction } from 'applications/actions/launcher';
import React, { Component, ComponentType  } from 'react';

interface ILauncherProps {
    showLauncher: () => IShowLauncherAction;
}

interface ILauncherState {}

type LauncherProps = ILauncherProps & WithStyles & WithWidthProps;

class Launcher extends Component<LauncherProps, ILauncherState> {

    public render() {
        const { width } = this.props;
        const { launcher } = this.props.classes;

        // TODO: launcher animation: hide sidenav, fade in from bottom

        return isWidthUp('lg', width) ?  (
            <div className={launcher}>
                <Apps fontSize={'inherit'} />
            </div>
        ) : null;
    }

}

const style: StyleRules = {
    launcher: {
        fontSize: '2.4vw',
        marginBottom: '.5vw',
        marginLeft: '.5vw',
        marginTop: 'auto',
        width: '100%',
    },
};

export default withStyles(style)(
    withWidth()(Launcher) as ComponentType<ILauncherProps & WithStyles>,
) as ComponentType<ILauncherProps>;
