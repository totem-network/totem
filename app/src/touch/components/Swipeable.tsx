import React, {
    Children,
    cloneElement,
    Component,
    ReactElement,
    Touch,
    TouchEvent,
} from 'react';

interface ISwipeableProps {
    distance?: number;
    onSwipeDown?: () => any;
    onSwipeLeft?: () => any;
    onSwipeRight?: () => any;
    onSwipeUp?: () => any;
}

interface ISwipeableState {
    touchStart: Touch;
}

class Swipeable extends Component<ISwipeableProps, ISwipeableState> {

    public readonly defaultDistance = 50;

    constructor(props: ISwipeableProps, context: any) {
        super(props, context);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
    }

    public shouldComponentUpdate(nextProps: ISwipeableProps, nextState: ISwipeableState) {
        if (this.props === nextProps) {
            return false;
        }
        return true;
    }

    public handleTouchStart(event: TouchEvent<HTMLElement>) {
        this.setState({
            ...this.state,
            touchStart: event.touches[0],
        });
    }

    public handleTouchMove(event: TouchEvent<HTMLElement>) {
        const touchCurrent = event.touches[0];
        const { touchStart } = this.state;
        const { onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
        const distance = this.props.distance || this.defaultDistance;

        if (
            -(touchCurrent.pageY - touchStart.pageY) >= distance &&
            onSwipeUp
        ) {
            onSwipeUp();
        }

        if (
            (touchCurrent.pageY - touchStart.pageY) >= distance &&
            onSwipeDown
        ) {
            onSwipeDown();
        }

        if (
            -(touchCurrent.pageX - touchStart.pageX) >= distance &&
            onSwipeLeft
        ) {
            onSwipeLeft();
        }

        if (
            (touchCurrent.pageX - touchStart.pageX) >= distance &&
            onSwipeRight
        ) {
            onSwipeRight();
        }
    }

    public render() {
        const { children } = this.props;

        return Children.map(children, (child) => {
            return cloneElement(child as ReactElement<any>, {
                onTouchMove: this.handleTouchMove,
                onTouchStart: this.handleTouchStart,
            });
        });
    }
}

export default Swipeable;
