import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import queueSelector from '../selectors/queue';
import Notification from './Notification';

interface IViewProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                boxSizing: 'border-box',
                marginTop: theme.spacing(1),
                padding: theme.spacing(0, 2),
            },
            width: '100%',
        },
    };
});

const View = ({}: IViewProps) => {
    const notifications = useSelector((state: any) => {
        return queueSelector(state);
    }, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();

    const renderedNotifications = notifications.map((notification: any, index: any) => {
        return (
            <Notification
                key={index}
                notification={notification}
            />
        )
    });

    return (
        <div
            className={classes.container}
        >
            {renderedNotifications}
        </div>
    );
};

export default View;
