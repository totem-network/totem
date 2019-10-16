import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { SwipeFromLeft } from 'gestures';
import React from 'react';
import { useDispatch } from 'react-redux';
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

    return (
        <div className={classes.container}>
            <SwipeFromLeft onSwipe={swipeFromLeft} />
        </div>
    );
};

export default Gestures;
