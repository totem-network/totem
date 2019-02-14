import LinearProgress from '@material-ui/core/LinearProgress';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface ILoadingBarProps {}

export interface ILoadingBarState {}

type LoadingBarProps = ILoadingBarProps & WithStyles;

class LoadingBar extends Component<LoadingBarProps, ILoadingBarState> {

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <LinearProgress />
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100%',
        },
    };
};

export default withStyles(style)(LoadingBar);
