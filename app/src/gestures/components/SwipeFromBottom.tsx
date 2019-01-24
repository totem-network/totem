import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromBottomProps {
    onSwipe: () => any;
}

interface ISwipeFromBottomState {}

type SwipeFromBottomProps = ISwipeFromBottomProps & WithStyles;

class SwipeFromBottom extends Component<SwipeFromBottomProps, ISwipeFromBottomState> {

    public render() {
        const { onSwipe } = this.props;
        const { container } = this.props.classes;

        return (
            <Swipeable onSwipeUp={onSwipe}>
                <div className={container} />
            </Swipeable>
        );
    }
}

const style: StyleRules = {
    container: {
        'bottom': 0,
        'height': '2%',
        'left': 0,
        'overflow': 'hidden',
        'position': 'fixed',
        'width': '100%',
    },
};

export default withStyles(style)(SwipeFromBottom);
