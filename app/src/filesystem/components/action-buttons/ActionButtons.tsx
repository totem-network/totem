import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Toolbar from '@material-ui/core/Toolbar';
import { isWidthDown } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useWidth } from 'ui';

export interface IActionButtonsProps {
    children: any;
    showSideNav: any;
}

const useStyles = makeStyles((theme: Theme) => {
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
});

const ActionButtons = ({
    children,
    showSideNav,
}: IActionButtonsProps) => {
    const classes = useStyles();
    const width = useWidth();

    if (isWidthDown('md', width)) {
        return (
            <AppBar
                className={classes.container}
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
                    {children}
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default ActionButtons;
