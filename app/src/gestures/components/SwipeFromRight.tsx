import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, ComponentType } from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromRightProps {
    onSwipe: () => any;
}

interface ISwipeFromRightState {}

type SwipeFromRightProps = ISwipeFromRightProps & WithStyles;

class SwipeFromRight extends Component<SwipeFromRightProps, ISwipeFromRightState> {

    public render() {
        const { onSwipe } = this.props;
        const { container } = this.props.classes;

        return (
            <Swipeable onSwipeLeft={onSwipe}>
                <div className={container} />
            </Swipeable>
        );
    }
}

const style: StyleRules = {
    container: {
        'height': '100%',
        'overflow': 'hidden',
        'position': 'fixed',
        'right': 0,
        'top': 0,
        'width': '5%',
    },
};

export default withStyles(style)(SwipeFromRight) as ComponentType<ISwipeFromRightProps>;
