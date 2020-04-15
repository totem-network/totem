import Badge from '@material-ui/core/Badge';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Notifications from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/styles';
import queueSelector from 'notifications/selectors/queue';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    DrawerView,
    showSystemBarDrawer,
} from '../../actions/systemBar';
import Item from './Item';

interface INotificationBarProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                borderRadius: '2vw',
                background: 'rgba(0, 0, 30, 0.6)',
                color: theme.palette.primary.contrastText,
                display: 'flex',
                flexDirection: 'column',
                left: '-64px',
                position: 'absolute',
                bottom: '16px',
            },
        },
    };
});

const NotificationBar = ({}: INotificationBarProps) => {
    const notifications = useSelector((state: any) => {
        return queueSelector(state);
    }, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();

    const createClickHandler = (view: DrawerView) => {
        return () => {
            dispatch(showSystemBarDrawer(view));
        };
    };

    return (
        <nav
            className={classes.container}
        >
            <Badge
                badgeContent={notifications.length}
                color={'secondary'}
                overlap={'circle'}
            >
                <Item
                    onClick={createClickHandler('notifications')}
                >
                    <Notifications fontSize={'inherit'} />
                </Item>
            </Badge>
        </nav>
    );
};

export default NotificationBar;
