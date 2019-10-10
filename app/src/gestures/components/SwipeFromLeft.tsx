import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromLeftProps {
    onSwipe: () => any;
}

const useStyles = makeStyles({
    container: {
        height: '100%',
        left: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        width: '5%',
    },
});

const SwipeFromLeft = ({
    onSwipe,
}: ISwipeFromLeftProps) => {
    const classes = useStyles();

    return (
        <Swipeable onSwipeRight={onSwipe}>
            <div className={classes.container} />
        </Swipeable>
    );
};

export default SwipeFromLeft;
