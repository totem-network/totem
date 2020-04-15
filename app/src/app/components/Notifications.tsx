import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import NotificationsView from 'notifications/components/View';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useWidth } from 'ui';
import desktopVisibleSelector from '../selectors/desktopVisible';

interface INotificationsProps {}

const useStyles = makeStyles({
    container: {
        left: '5vw',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: '5vw',
        width: 'calc(100% - 10vw)',
    },
});

const Notifications = ({}: INotificationsProps) => {
    const { isVisible } = useSelector(desktopVisibleSelector, shallowEqual);

    const classes = useStyles();
    const width = useWidth();

    if (!isVisible) {
        return null;
    }

    return isWidthDown('md', width) ?  (
        <div
            className={classes.container}
        >
            <NotificationsView />
        </div>
    ) : null;
};

export default Notifications;
