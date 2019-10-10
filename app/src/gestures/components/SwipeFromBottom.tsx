import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromBottomProps {
    onSwipe: () => any;
}

const useStyles = makeStyles({
    container: {
        bottom: 0,
        height: '2%',
        left: 0,
        overflow: 'hidden',
        position: 'fixed',
        width: '100%',
    },
});

const SwipeFromBottom = ({
    onSwipe,
}: ISwipeFromBottomProps) => {
    const classes = useStyles();

    return (
        <Swipeable onSwipeUp={onSwipe}>
            <div className={classes.container} />
        </Swipeable>
    );
};

export default SwipeFromBottom;
