import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { HomeButton, TaskTitle, Window } from 'applications';
import classNames from 'classnames';
import { List } from 'immutable';
import React, { Component, ComponentType, Fragment } from 'react';

interface IInstance {
    application: string;
    icon: string;
    id: string;
    themeColor: string;
    title: string;
}

interface IWindow {
    height: number;
    minimized: boolean;
    instance: string;
    width: number;
    x: number;
    y: number;
}

interface IWindowsProps {
    instances: IInstance[];
    showTaskManager: boolean;
    windows: IWindow[];
}

interface IWindowsState {
    changing: boolean;
}

type WindowsProps = IWindowsProps & WithStyles;

class Windows extends Component<WindowsProps, IWindowsState> {

    constructor(props: WindowsProps, context?: any) {
        super(props, context);

        this.state = {
            changing: false,
        };

        this.startChange = this.startChange.bind(this);
        this.finishChange = this.finishChange.bind(this);
    }

    public startChange() {
        this.setState({
            ...this.state,
            changing: true,
        });
    }

    public finishChange() {
        this.setState({
            ...this.state,
            changing: false,
        });
    }

    public render() {
        const { showTaskManager, windows } = this.props;
        const { container, containerNoPointerEvents } = this.props.classes;

        const containerClass = classNames(
            container,
            {
                [containerNoPointerEvents]: (
                    this.getFocusedIndex(windows) === -1 &&
                    !showTaskManager
                ),
            },
        );

        return (
            <div className={containerClass}>
                {this.renderWindows()}
                {this.renderHomeButton()}
            </div>
        );
    }

    protected renderWindows() {
        const { showTaskManager, windows } = this.props;
        const { changing } = this.state;

        const focusedIndex = this.getFocusedIndex(windows);

        const orderedWindows: any = {};

        windows.forEach((window: IWindow, index: number) => {
            orderedWindows[window.instance] = index;
        });

        return List(windows).sort((a: IWindow, b: IWindow) => {
            // sorting by instance is required to prevent reloading of applications iframe
            // to change the order in the view change the orderedWindows object
            return a.instance.localeCompare(b.instance);
        }).map((window) => {
            if (!window) {
                return null;
            }

            let focused: boolean = false;
            if (focusedIndex === orderedWindows[window.instance]) {
                focused = true;
            }

            let minimized = window.minimized;
            let offset = 0;
            let taskStyle = {};

            if (showTaskManager) {
                minimized = false;
                focused = true;

                // TODO: replace focusedIndex with index from sorted windows
                let sortedIndex = focusedIndex;
                if (focusedIndex === -1) {
                    sortedIndex = 0;
                }

                offset = orderedWindows[window.instance] - sortedIndex;

                taskStyle = {
                    left: offset * 75 + 'vw',
                    top: '-5vh',
                };
            }

            return (
                <Fragment key={window.instance}>
                    <Window
                        focused={focused}
                        instance={window.instance}
                        minimized={minimized}
                        task={showTaskManager}
                        taskStyle={taskStyle}
                        windowHeight={window.height}
                        windowWidth={window.width}
                        x={window.x}
                        y={window.y}
                        zIndex={orderedWindows[window.instance]}
                        changing={changing}
                        startChange={this.startChange}
                        finishChange={this.finishChange}
                    />
                    {this.renderTaskInfo(window.instance, offset)}
                </Fragment>
            );
        });
    }

    protected renderTaskInfo(instanceId: string, offset: number) {
        const { classes, instances, showTaskManager } = this.props;

        const taskInstance = List(instances).find((instance) => {
            if (!instance) {
                return false;
            }

            return (instance.id === instanceId);
        });

        if (!showTaskManager || !taskInstance) {
            return null;
        }

        return (
            <TaskTitle
                icon={taskInstance.icon}
                offset={offset}
                themeColor={taskInstance.themeColor}
                title={taskInstance.title}
            />
        );
    }

    protected renderHomeButton() {
        return this.props.showTaskManager ? (
            <HomeButton />
        ) : null;
    }

    protected getFocusedIndex(windows: IWindow[]) {
        return List(windows).findLastIndex((window?: IWindow) => {
            if (!window) {
                return false;
            }

            return !window.minimized;
        });
    }
}

const style: StyleRules = {
    container: {
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
    },
    containerNoPointerEvents: {
        pointerEvents: 'none',
    },
    windowContainer: {
        height: '100%',
        width: '100%',
    },
};

export default withStyles(style)(Windows) as ComponentType<IWindowsProps>;
