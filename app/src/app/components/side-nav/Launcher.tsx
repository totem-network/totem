import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import Apps from '@material-ui/icons/Apps';
import { IShowLauncherAction } from 'app/actions/launcher';
import React, { Component  } from 'react';

interface ILauncherProps {
    showLauncher: () => IShowLauncherAction;
}

interface ILauncherState {}

type LauncherProps = ILauncherProps & WithStyles & WithWidth;

class Launcher extends Component<LauncherProps, ILauncherState> {

    public render() {
        const { showLauncher, width } = this.props;
        const { launcher } = this.props.classes;

        // TODO: launcher animation: hide sidenav, fade in from bottom

        return isWidthUp('lg', width) ?  (
            <div className={launcher} onClick={showLauncher}>
                <Apps fontSize={'inherit'} />
            </div>
        ) : null;
    }

}

const style: StyleRules = {
    launcher: {
        cursor: 'pointer',
        fontSize: '2.4vw',
        marginBottom: '.5vw',
        marginLeft: '.5vw',
        marginTop: 'auto',
        width: '100%',
    },
};

export default withStyles(style)(
    withWidth()(Launcher),
);
