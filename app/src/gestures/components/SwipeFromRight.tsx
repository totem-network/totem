import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromRightProps {
    onSwipe: () => any;
}

const useStyles = makeStyles({
    container: {
        height: '100%',
        overflow: 'hidden',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '5%',
    },
});

const SwipeFromRight = ({
    onSwipe,
}: ISwipeFromRightProps) => {
    const classes = useStyles();

    return (
        <Swipeable onSwipeLeft={onSwipe}>
            <div className={classes.container} />
        </Swipeable>
    );
};

export default SwipeFromRight;
