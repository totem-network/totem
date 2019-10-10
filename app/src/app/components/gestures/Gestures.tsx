import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { SwipeFromLeft } from 'gestures';
import React from 'react';

interface IGesturesProps {
    swipeFromLeft: () => any;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
            height: '100%',
            left: 0,
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            width: '100%',
        },
    };
});

const Gestures = ({
    swipeFromLeft,
}: IGesturesProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <SwipeFromLeft onSwipe={swipeFromLeft} />
        </div>
    );
};

export default Gestures;
