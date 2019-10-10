import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface ILoadingBarProps {}

const useStyles = makeStyles({
    container: {
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
    },
});

const LoadingBar = ({}: ILoadingBarProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <LinearProgress />
        </div>
    );
};

export default LoadingBar;
