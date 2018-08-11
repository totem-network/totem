import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, isWidthUp, WithWidthProps } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import { SwipeFromBottom } from 'gestures';
import React, {
    Component,
    ComponentType,
    CSSProperties,
    MouseEvent,
} from 'react';
import { Swipeable } from 'touch';
import {
    ICloseApplicationAction,
} from './../actions/application';
import {
    IShowTaskManagerAction,
} from './../actions/taskManager';
import {
    IFocusWindowAction,
    IMinimizeWindowAction,
    IMoveWindowAction,
    IResizeWindowAction,
} from './../actions/windows';
import Header from './window/Header';
import Resize from './window/Resize';
import Sandbox from './window/Sandbox';

interface IWindowProps {
    application: string;
    changing: boolean;
    close: (instance: string) => ICloseApplicationAction;
    finishChange: () => void;
    focus: (instance: string) => IFocusWindowAction;
    focused: boolean;
    windowHeight: number;
    instance: string;
    minimize: (instance: string) => IMinimizeWindowAction;
    minimized: boolean;
    move: (instance: string, x: number, y: number) => IMoveWindowAction;
    resize: (instance: string, width: number, height: number) => IResizeWindowAction;
    showTaskManager: () => IShowTaskManagerAction;
    startChange: () => void;
    task: boolean;
    taskStyle: CSSProperties;
    themeColor: string;
    title: string;
    windowWidth: number;
    x: number;
    y: number;
    zIndex: number;
}

interface IWindowState {}

type WindowProps = IWindowProps & WithStyles & WithWidthProps;

class Window extends Component<WindowProps, IWindowState> {

    public static readonly MIN_HEIGHT = 200;

    public static readonly MIN_WIDTH = 400;

    protected offsetHeight: number;

    protected offsetWidth: number;

    protected offsetX: number;

    protected offsetY: number;

    protected domNode?: HTMLElement;

    constructor(props: WindowProps, context?: any) {
        super(props, context);

        this.offsetHeight = 0;
        this.offsetWidth = 0;
        this.offsetX = 0;
        this.offsetY = 0;

        this.close = this.close.bind(this);
        this.finish = this.finish.bind(this);
        this.focus = this.focus.bind(this);
        this.minimize = this.minimize.bind(this);
        this.move = this.move.bind(this);
        this.resize = this.resize.bind(this);

        this.setRef = this.setRef.bind(this);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderResize = this.renderResize.bind(this);
    }

    public setRef(element: any) {
        this.domNode = element;
    }

    public close() {
        const { close, instance } = this.props;

        close(instance);
    }

    public finish(): void {
        const {
            finishChange,
            instance,
            move,
            resize,
        } = this.props;

        if (this.offsetX !== 0 || this.offsetY !== 0) {
            // TODO: min and max x/y

            move(instance, this.offsetX, this.offsetY);
        }

        if (this.offsetWidth !== 0 || this.offsetHeight !== 0) {
            // TODO: does not resize correct
            // Maybe (this.props.windowWidth + this.offsetWidth) - Window.MIN_WIDTH

            /*const resizeX = ((this.offsetWidth + this.props.windowWidth) >= Window.MIN_WIDTH) ?
                this.offsetWidth :
                this.props.windowWidth - Window.MIN_WIDTH;

            const resizeY = ((this.offsetHeight + this.props.windowHeight) >= Window.MIN_HEIGHT) ?
                this.offsetHeight :
                this.props.windowHeight - Window.MIN_HEIGHT;

            resize(instance, resizeX, resizeY);*/
            resize(instance, this.offsetWidth, this.offsetHeight);
        }

        this.offsetHeight = 0;
        this.offsetWidth = 0;
        this.offsetX = 0;
        this.offsetY = 0;

        finishChange();
    }

    public focus() {
        const { focus, focused, instance } = this.props;

        if (!focused) {
            focus(instance);
        }
    }

    public minimize(event: MouseEvent<HTMLElement>) {
        const { minimize, instance } = this.props;

        minimize(instance);
    }

    public move(x: number, y: number): void {
        if (!this.props.changing) {
            this.props.startChange();
        }

        if (!this.domNode) {
            return;
        }

        // TODO: min and max x/y

        this.offsetX = this.offsetX + x;
        this.offsetY = this.offsetY + y;

        this.domNode.style.top = this.props.y + this.offsetY + 'px';
        this.domNode.style.left = this.props.x + this.offsetX + 'px';
    }

    public resize(width: number, height: number): void {
        if (!this.props.changing) {
            this.props.startChange();
        }

        if (!this.domNode) {
            return;
        }

        this.offsetWidth = this.offsetWidth + width;
        this.offsetHeight = this.offsetHeight + height;

        ((this.offsetWidth + this.props.windowWidth) >= Window.MIN_WIDTH) ?
            this.domNode.style.width = this.props.windowWidth + this.offsetWidth + 'px' :
            this.domNode.style.width = Window.MIN_WIDTH + 'px';

        ((this.offsetHeight + this.props.windowHeight) >= Window.MIN_HEIGHT) ?
            this.domNode.style.height = this.props.windowHeight + this.offsetHeight + 'px' :
            this.domNode.style.height = Window.MIN_HEIGHT + 'px';
    }

    public render() {
        const {
            application,
            changing,
            classes,
            focused,
            minimized,
            task,
            taskStyle,
            width,
            windowHeight,
            windowWidth,
            x,
            y,
            zIndex,
        } = this.props;

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

        return (
            <div
                className={className}
                style={windowPositionStyle}
                ref={this.setRef}
                onMouseDownCapture={this.focus}
            >
                {this.renderHeader()}
                <Sandbox
                    pointerEvents={changing || task}
                    src={application}
                />
                {this.renderMobileTasks()}
                {this.renderResize()}
                {this.renderTaskOverlay()}
            </div>
        );
    }

    protected renderHeader() {
        const {
            themeColor,
            title,
            width,
        } = this.props;

        return isWidthUp('lg', width) ? (
            <Header
                close={this.close}
                finish={this.finish}
                minimize={this.minimize}
                move={this.move}
                themeColor={themeColor}
                title={title}
            />
        ) : null;
    }

    protected renderMobileTasks() {
        const { showTaskManager, width } = this.props;

        const swipe = () => {
            showTaskManager();
        };

        return isWidthDown('md', width) ? (
            <SwipeFromBottom onSwipe={swipe} />
        ) : null;
    }

    protected renderResize() {
        const { width } = this.props;

        return isWidthUp('lg', width) ? (
            <Resize
                finish={this.finish}
                move={this.move}
                resize={this.resize}
            />
        ) : null;
    }

    protected renderTaskOverlay() {
        const { task } = this.props;
        const { taskOverlay } = this.props.classes;

        return task ? (
            <Swipeable
                onSwipeUp={this.close}
            >
                <div className={taskOverlay} />
            </Swipeable>
        ) : null;
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
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
};

export default withStyles(style)(
    withWidth()(Window) as ComponentType<IWindowProps & WithStyles>,
) as ComponentType<IWindowProps>;
