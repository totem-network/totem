import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface IBackgroundProps {}

const useStyles = makeStyles({
    background: {
        backgroundImage: 'url(\'/images/background.svg\')',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
    },
});

const Background = ({}: IBackgroundProps) => {
    const classes = useStyles();

    return (
        <div className={classes.background} />
    );
};

export default Background;
