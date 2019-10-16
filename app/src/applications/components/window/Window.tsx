import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { SwipeFromBottom } from 'gestures';
import React, {
    CSSProperties,
    MouseEvent,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Swipeable } from 'touch';
import { useWidth } from 'ui';
import {
    closeApplication,
} from '../../actions/application';
import {
    hideTaskManager,
    showTaskManager,
} from '../../actions/taskManager';
import {
    focusWindow,
    minimizeWindow,
    moveWindow,
    resizeWindow,
} from '../../actions/windows';
import instanceSelector from '../../selectors/instance';
import Header from './Header';
import Resize from './Resize';

interface IWindowProps {
    children: any;
    focused: boolean;
    instance: string;
    minimized: boolean;
    noHeader?: boolean;
    task: boolean;
    taskStyle: CSSProperties;
    windowHeight: number;
    windowWidth: number;
    x: number;
    y: number;
    zIndex: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        focused: {
            [theme.breakpoints.down('md')]: {
                display: 'block',
            },
        },
        minimized: {
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
        },
        notFocused: {
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        task: {
            [theme.breakpoints.up('lg')]: {
                // TODO
            },
            height: '100vh',
            position: 'absolute',
            transform: 'scale(0.7)',
            width: '100vw',
        },
        taskOverlay: {
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
        },
        window: {
            [theme.breakpoints.up('lg')]: {
                borderRadius: '.25vw 1vw .25vw',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.4)',
                willChange: 'height, left, top, width',
            },
            height: '100%',
            left: '0',
            overflow: 'hidden',
            position: 'absolute',
            top: '0',
            width: '100%',
        },
    };
});

const MIN_HEIGHT = 200;

const MIN_WIDTH = 400;

const Window = ({
    children,
    focused,
    instance,
    minimized,
    noHeader,
    task,
    taskStyle,
    windowHeight,
    windowWidth,
    x,
    y,
    zIndex,
}: IWindowProps) => {
    const { themeColor, title } = useSelector((state) => {
        return instanceSelector(state, instance);
    }, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();
    const width = useWidth();

    let offsetHeight = 0;
    let offsetWidth = 0;
    let offsetX = 0;
    let offsetY = 0;

    let domNode: HTMLElement | null = null;
    let changing = false;

    const setRef = (element: any) => {
        domNode = element;
    };

    const closeInstance = () => {
        dispatch(closeApplication(instance));
    };

    const finish = () => {
        if (offsetX !== 0 || offsetY !== 0) {
            // TODO: min and max x/y

            dispatch(moveWindow(instance, offsetX, offsetY));
        }

        if (offsetWidth !== 0 || offsetHeight !== 0) {
            // TODO: does not resize correct
            // Maybe (this.props.windowWidth + this.offsetWidth) - Window.MIN_WIDTH

            /*const resizeX = ((this.offsetWidth + this.props.windowWidth) >= Window.MIN_WIDTH) ?
                this.offsetWidth :
                this.props.windowWidth - Window.MIN_WIDTH;

            const resizeY = ((this.offsetHeight + this.props.windowHeight) >= Window.MIN_HEIGHT) ?
                this.offsetHeight :
                this.props.windowHeight - Window.MIN_HEIGHT;

            resize(instance, resizeX, resizeY);*/
            dispatch(resizeWindow(instance, offsetWidth, offsetHeight));
        }

        offsetHeight = 0;
        offsetWidth = 0;
        offsetX = 0;
        offsetY = 0;

        changing = false;
    };

    const focusInstance = () => {
        if (!focused) {
            dispatch(focusWindow(instance));
        }
    };

    const minimizeInstance = (event: MouseEvent<HTMLElement>) => {
        dispatch(minimizeWindow(instance));
    };

    const moveInstance = (moveX: number, moveY: number) => {
        if (!changing) {
            changing = true;
        }

        if (!domNode) {
            return;
        }

        // TODO: min and max x/y

        offsetX = offsetX + moveX;
        offsetY = offsetY + moveY;

        domNode.style.top = y + offsetY + 'px';
        domNode.style.left = x + offsetX + 'px';
    };

    const resizeInstance = (resizeWidth: number, resizeHeight: number) => {
        if (!changing) {
            changing = true;
        }

        if (!domNode) {
            return;
        }

        offsetWidth = offsetWidth + resizeWidth;
        offsetHeight = offsetHeight + resizeHeight;

        ((offsetWidth + windowWidth) >= MIN_WIDTH) ?
            domNode.style.width = windowWidth + offsetWidth + 'px' :
            domNode.style.width = MIN_WIDTH + 'px';

        ((offsetHeight + windowHeight) >= MIN_HEIGHT) ?
            domNode.style.height = windowHeight + offsetHeight + 'px' :
            domNode.style.height = MIN_HEIGHT + 'px';
    };

    let windowPositionStyle: CSSProperties = isWidthUp('lg', width) ? {
        height: windowHeight + 'px',
        left: x + 'px',
        top: y + 'px',
        width: windowWidth + 'px',
        zIndex,
    } : {};

    let className = classNames(
        classes.window,
        {
            [classes.minimized]: minimized,
            [classes.focused]: focused,
            [classes.notFocused]: !focused,
        },
    );

    if (task) {
        className = classes.task;
        windowPositionStyle = taskStyle;
    }

    const headerComponent = isWidthUp('lg', width) ? (
        <Header
            close={closeInstance}
            finish={finish}
            minimize={minimizeInstance}
            move={moveInstance}
            noHeader={noHeader}
            themeColor={themeColor}
            title={title}
        />
    ) : null;

    const swipe = () => {
        dispatch(showTaskManager());
    };

    const mobileTaskManagerGestureComponent = isWidthDown('md', width) ? (
        <SwipeFromBottom onSwipe={swipe} />
    ) : null;

    const resizeComponent = isWidthUp('lg', width) ? (
        <Resize
            finish={finish}
            move={moveInstance}
            resize={resizeInstance}
        />
    ) : null;

    const focusTask = () => {
        dispatch(focusWindow(instance));
        dispatch(hideTaskManager());
    };

    const taskOverlayComponent = task ? (
        <Swipeable
            onSwipeUp={closeInstance}
        >
            <div
                className={classes.taskOverlay}
                onClick={focusTask}
            />
        </Swipeable>
    ) : null;

    const childrenWithChanging = changing ? React.cloneElement(children, { pointerEvents: changing }) : children;

    return (
        <div
            className={className}
            style={windowPositionStyle}
            ref={setRef}
            onMouseDownCapture={focusInstance}
        >
            {headerComponent}
            {childrenWithChanging}
            {mobileTaskManagerGestureComponent}
            {resizeComponent}
            {taskOverlayComponent}
        </div>
    );
};

export default Window;
