import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface ILoadingButtonProps extends ButtonProps {
    children: any;
    loading: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            position: 'relative',
        },
        progressPrimary: {
            color: theme.palette.primary.contrastText,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        progressSecondary: {
            color: theme.palette.secondary.contrastText,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    };
});

const LoadingButton = ({
    children,
    loading,
    ...props
}: ILoadingButtonProps) => {
    const classes = useStyles();

    return (
        <div
            className={classes.container}
        >
            <Button
                {...props}
            >
                {children}
            </Button>
            {loading && (
                <CircularProgress
                    size={24}
                    className={props.color === 'primary' ? classes.progressPrimary : classes.progressSecondary}
                />
            )}
        </div>
    );
};

export default LoadingButton;
