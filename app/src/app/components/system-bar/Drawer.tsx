import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useWidth } from 'ui';
import { hideSystemBarDrawer } from '../../actions/systemBar';
import systemBarSelector from '../../selectors/systemBar';
import CurrentDate from '../clock/CurrentDate';
import CurrentTime from '../clock/CurrentTime';
import DrawerViews from './DrawerViews';
import NotificationBar from './NotificationBar';
import QuickSettings from './QuickSettings';

interface IDrawerProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        paper: {
            [theme.breakpoints.up('lg')]: {
                background: 'rgba(0, 0, 30, 0.6)',
                width: '20vw',
            },
            [theme.breakpoints.down('md')]: {
                background: '#f0f0f0',
                position: 'relative',
            },
            overflow: 'visible',
        },
        header: {
            [theme.breakpoints.up('lg')]: {
                alignItems: 'center',
                boxSizing: 'border-box',
                color: theme.palette.primary.contrastText,
                display: 'flex',
                padding: theme.spacing(0, 3, 0, 1),
                width: '100%',
                ...theme.mixins.toolbar,
                justifyContent: 'flex-start',
            },
            display: 'none',
        },
        time: {
            display: 'flex',
            marginLeft: 'auto',
        },
    };
});

const Drawer = ({}: IDrawerProps) => {
    const { drawerView, isDrawerVisible } = useSelector(systemBarSelector, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();
    const width = useWidth();

    let anchor: any = 'right';
    let variant: any = 'persistent';
    if (isWidthDown('md', width)) {
        anchor = 'top';
        variant = 'temporary';
    }

    const handleOpen = () => {
        //
    };

    const handleClose = () => {
        dispatch(hideSystemBarDrawer());
    };

    const renderDate = () => {
        if (isWidthDown('md', width)) {
            return (
                <CurrentDate />
            );
        }

        return null;
    };

    const renderNotificationBar = () => {
        if (isWidthUp('lg', width)) {
            return (
                <NotificationBar />
            );
        }

        return null;
    };

    const renderQuickSettings = () => {
        if (isWidthUp('lg', width)) {
            return (
                <QuickSettings />
            );
        }

        return null;
    };

    return (
        <SwipeableDrawer
            anchor={anchor}
            classes={{
                paper: classes.paper
            }}
            open={isDrawerVisible}
            onClose={handleClose}
            onOpen={handleOpen}
            variant={variant}
        >
            <div
                className={classes.header}
            >
                <IconButton
                    onClick={handleClose}
                    color={'inherit'}
                >
                    <ChevronRightIcon />
                </IconButton>
                <div
                    className={classes.time}
                >
                    <CurrentTime />
                </div>
            </div>
            <DrawerViews
                view={drawerView}
            />
            {renderDate()}
            {renderQuickSettings()}
            {renderNotificationBar()}
        </SwipeableDrawer>
    );
};

export default Drawer;
