import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';

export interface IErrorProps {
    error: any;
    retry: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            color: theme.palette.error.main,
            fontSize: '4rem',
            left: '50%',
            pointerEvents: 'none',
            position: 'absolute',
            textAlign: 'center',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        message: {
            fontSize: '1rem',
            marginTop: '.5rem',
        },
        retryButton: {
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            pointerEvents: 'auto',
        },
    };
});

const Error = ({
    error,
    retry,
}: IErrorProps) => {
    const classes = useStyles();

    useEffect(() => {
        // TODO: log error to sentry

        // tslint:disable-next-line:no-console
        console.log(error);
    }, []);

    return (
        <div className={classes.container}>
            <ErrorOutline
                fontSize='inherit'
            />
            <div className={classes.message}>
                Error: Could not load files
            </div>
            <div className={classes.retryButton} onClick={retry}>
                Retry
            </div>
        </div>
    );
};

export default Error;
