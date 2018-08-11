import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, ComponentType } from 'react';
import Swipeable from 'touch/components/Swipeable';

interface ISwipeFromLeftProps {
    onSwipe: () => any;
}

interface ISwipeFromLeftState {}

type SwipeFromLeftProps = ISwipeFromLeftProps & WithStyles;

class SwipeFromLeft extends Component<SwipeFromLeftProps, ISwipeFromLeftState> {

    public render() {
        const { onSwipe } = this.props;
        const { container } = this.props.classes;

        return (
            <Swipeable onSwipeRight={onSwipe}>
                <div className={container} />
            </Swipeable>
        );
    }
}

const style: StyleRules = {
    container: {
        'height': '100%',
        'left': 0,
        'overflow': 'hidden',
        'position': 'fixed',
        'top': 0,
        'width': '5%',
    },
};

export default withStyles(style)(SwipeFromLeft) as ComponentType<ISwipeFromLeftProps>;
