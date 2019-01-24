import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromTopProps {
    onSwipe: () => any;
}

interface ISwipeFromTopState {}

type SwipeFromTopProps = ISwipeFromTopProps & WithStyles;

class SwipeFromTop extends Component<SwipeFromTopProps, ISwipeFromTopState> {

    public render() {
        const { onSwipe } = this.props;
        const { container } = this.props.classes;

        return (
            <Swipeable onSwipeDown={onSwipe}>
                <div className={container} />
            </Swipeable>
        );
    }
}

const style: StyleRules = {
    container: {
        'height': '5%',
        'left': 0,
        'overflow': 'hidden',
        'position': 'fixed',
        'top': 0,
        'width': '100%',
    },
};

export default withStyles(style)(SwipeFromTop);
