import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import SwipeFromLeft from 'gestures/components/SwipeFromLeft';
import SwipeFromTop from 'gestures/components/SwipeFromTop';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showSystemBarDrawer } from '../../actions/systemBar';
import { showSideNav } from '../../actions/sideNav';

interface IGesturesProps {}

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

const Gestures = ({}: IGesturesProps) => {
    const dispatch = useDispatch();

    const classes = useStyles();

    const swipeFromLeft = () => {
        dispatch(showSideNav());
    };

    const swipeFromTop = () => {
        dispatch(showSystemBarDrawer());
    };

    return (
        <div className={classes.container}>
            <SwipeFromLeft onSwipe={swipeFromLeft} />
            <SwipeFromTop onSwipe={swipeFromTop} />
        </div>
    );
};

export default Gestures;
