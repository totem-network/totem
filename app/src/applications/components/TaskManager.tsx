import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import React, { Component } from 'react';
import Sandbox from './window/Sandbox';

interface IWindow {
    height: number;
    minimized: boolean;
    instance: string;
    width: number;
    x: number;
    y: number;
}

interface ITaskManagerProps {
    windows: IWindow[];
    focusedIndex: number;
}

interface ITaskManagerState {}

type TaskManagerProps = ITaskManagerProps & WithStyles & WithWidth;

class TaskManager extends Component<TaskManagerProps, ITaskManagerState> {

    constructor(props: TaskManagerProps, context?: any) {
        super(props, context);
    }

    public render() {
        const { container } = this.props.classes;

        return (
            <div className={container}>
                {this.renderTasks()}
            </div>
        );
    }

    protected renderTasks() {
        const { focusedIndex, width, windows } = this.props;

        if (isWidthDown('md', width)) {
            const previousIndex = (focusedIndex === 0) ? 0 : focusedIndex - 1;
            const nextIndex = (focusedIndex === windows.length) ? windows.length : focusedIndex + 1;

            // TODO: this will not work, use the rendered windows for preview

            return (
                <div />
            );
        } else {
            return (
                <div />
            );
        }
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                height: 'auto',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: 'auto',
            },
            height: '100%',
            left: '0',
            overflow: 'hidden',
            position: 'absolute',
            top: '0',
            width: '100%',
        },
        windowContainer: {
            height: '60vh',
            width: '60vw',
        },
    };
};

export default withStyles(style)(
    withWidth()(TaskManager),
);
