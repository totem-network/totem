import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';

export interface IActionButtonsProps {
    showSideNav: any;
}

export interface IActionButtonsState {}

type ActionButtonsProps = IActionButtonsProps & WithStyles & WithWidth;

class ActionButtons extends Component<ActionButtonsProps, IActionButtonsState> {

    public render() {
        const {
            showSideNav,
            width,
        } = this.props;

        const {
            container,
        } = this.props.classes;

        if (isWidthDown('md', width)) {
            return (
                <AppBar
                    className={container}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Menu"
                            onClick={showSideNav}
                        >
                            <MenuIcon />
                        </IconButton>
                        {this.props.children}
                    </Toolbar>
                </AppBar>
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
                bottom: '0',
                right: '0',
                textAlign: 'center',
                top: 'auto',
            },
            position: 'absolute',
            top: '0',
        },
    };
};

export default withStyles(style)(
    withWidth()(ActionButtons),
);
