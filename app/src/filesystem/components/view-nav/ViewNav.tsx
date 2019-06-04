import BottomNavigation from '@material-ui/core/BottomNavigation';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import React, { Component } from 'react';

export interface IViewNavProps {}

export interface IViewNavState {}

type ViewNavProps = IViewNavProps & WithStyles & WithWidth;

class ViewNav extends Component<ViewNavProps, IViewNavState> {

    public render() {
        const {
            width,
        } = this.props;

        const {
            container,
        } = this.props.classes;

        if (isWidthDown('md', width)) {
            return (
                <BottomNavigation
                    className={container}
                    showLabels={true}
                >
                    {this.props.children}
                </BottomNavigation>
            );
        }

        return (
            <div className={container}>
                {this.props.children}
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                bottom: 'auto',
                left: '50%',
                pointerEvents: 'none',
                textAlign: 'center',
                top: '0',
                transform: 'translate(-50%, 0)',
                zIndex: 2,
            },
            bottom: '0',
            position: 'absolute',
            width: '100%',
        },
    };
};

export default withStyles(style)(
    withWidth()(ViewNav),
);
