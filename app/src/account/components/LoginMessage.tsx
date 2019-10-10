import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface ILoginMessageProps {}

const useStyles = makeStyles({
    wrapper: {
        fontSize: '4rem',
        textTransform: 'uppercase',
    },
});

const LoginMessage = ({}: ILoginMessageProps) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Typography variant="h2">
                Hello
            </Typography>
        </div>
    );
};

export default LoginMessage;
