import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';
import { INotification } from '../actions/queue';
import Action from './Action';

interface INotificationProps {
    notification: INotification;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            marginTop: theme.spacing(1),
        },
        content: {
            '&:last-child': {
                paddingBottom: theme.spacing(1),
            },
            padding: theme.spacing(1),
        },
        contentContainer: {
            boxSizing: 'border-box',
            display: 'flex',
            width: '100%',
        },
        contentWithImage: {
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 80px - ' + theme.spacing(2) + 'px)',
        },
        date: {
            fontSize: '0.75rem',
            marginRight: theme.spacing(0.5),
            marginTop: theme.spacing(-0.5),
        },
        header: {
            boxSizing: 'border-box',
            padding: theme.spacing(1),
            width: '100%',
        },
        headerTitle: {
            fontSize: '0.875rem',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
        image: {
            borderRadius: theme.shape.borderRadius,
            height: '80px',
            margin: theme.spacing(1),
            width: '80px',
        },
    };
});

const Notification = ({
    notification,
}: INotificationProps) => {
    const classes = useStyles();

    const dateDistance = formatDistance(notification.timestamp, new Date());

    const renderActions = () => {
        if (!notification.actions || notification.actions.length === 0) {
            return null;
        }

        const renderedActions = notification.actions.map((action, index) => {
            return (
                <Action
                    key={index}
                    action={action}
                />
            );
        });

        return (
            <CardActions>
                {renderedActions}
            </CardActions>
        );
    };

    const renderContent = () => {
        if (!notification.image) {
            return (
                <CardContent
                    className={classes.content}
                >
                    {notification.body}
                </CardContent>
            );
        }

        return (
            <div
                className={classes.contentContainer}
            >
                <CardContent
                    className={classNames(
                        classes.content,
                        classes.contentWithImage,
                    )}
                >
                    {notification.body}
                </CardContent>
                <CardMedia
                    className={classes.image}
                    image={notification.image}
                />
            </div>
        );
    };

    return (
        <Card
            className={classes.container}
        >
            <CardHeader
                action={(
                    <>
                        {dateDistance} ago
                    </>
                )}
                avatar={notification.icon ? (
                    <img
                        src={notification.icon}
                        height={'16px'}
                        width={'16px'}
                    />
                ) : null}
                classes={{
                    action: classes.date,
                    avatar: classes.icon,
                    root: classes.header,
                    title: classes.headerTitle,
                }}
                title={notification.title}
                titleTypographyProps={{
                    variant: 'body2',
                }}
            />
            {renderContent()}
            {renderActions()}
        </Card>
    );
};

export default Notification;
