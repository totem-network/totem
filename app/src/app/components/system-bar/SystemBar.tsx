import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthUp } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, {
    MouseEvent,
    TouchEvent,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useWidth } from 'ui';
import systemBarSelector from '../../selectors/systemBar';
import Clock from './Clock';
import Drawer from './Drawer';
import NotificationBar from './NotificationBar';
import QuickSettings from './QuickSettings';

interface ISystemBarProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'auto',
                width: '0%',
            },
            overflow: 'hidden',
            pointerEvents: 'none',
            position: 'fixed',
            right: 0,
            top: 0,
            width: '100%',
        },
        containerVisible: {
            pointerEvents: 'auto',
        },
    };
});

const SystemBar = ({}: ISystemBarProps) => {
    const { isDrawerVisible } = useSelector(systemBarSelector, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();
    const width = useWidth();

    const renderNotificationBar = () => {
        if (isWidthUp('lg', width) && !isDrawerVisible) {
            return (
                <NotificationBar />
            );
        }

        return null;
    };

    const renderQuickSettings = () => {
        if (isWidthUp('lg', width) && !isDrawerVisible) {
            return (
                <QuickSettings />
            );
        }

        return null;
    };

    return (
            <aside
                className={classNames(
                    classes.container,
                    {
                        [classes.containerVisible]: isDrawerVisible,
                    },
                )}
            >
                <Clock />
                {renderQuickSettings()}
                {renderNotificationBar()}
                <Drawer />
            </aside>
    );
};

export default SystemBar;
