import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromTopProps {
    onSwipe: () => any;
}

const useStyles = makeStyles({
    container: {
        height: '2%',
        left: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        width: '100%',
    },
});

const SwipeFromTop = ({
    onSwipe,
}: ISwipeFromTopProps) => {
    const classes = useStyles();

    return (
        <Swipeable onSwipeDown={onSwipe}>
            <div className={classes.container} />
        </Swipeable>
    );
};

export default SwipeFromTop;
