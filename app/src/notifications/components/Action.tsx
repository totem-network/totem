import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { INotificationAction } from '../actions/queue';

interface IActionProps {
    action: INotificationAction;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            //
        },
    };
});

const Action = ({
    action,
}: IActionProps) => {
    const classes = useStyles();

    if (action.icon) {
        return (
            <IconButton>
                {action.icon}
            </IconButton>
        );
    }

    return (
        <Button
            className={classes.container}
            color={'primary'}
            variant={'contained'}
        >
            {action.title}
        </Button>
    );
};

export default Action;
