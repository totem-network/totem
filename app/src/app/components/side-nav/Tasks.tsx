import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import {
    IFocusWindowAction,
    IStartApplicationAction,
} from 'applications';
import React, {
    Component,
    ComponentType,
    CSSProperties,
    Fragment,
    MouseEvent,
} from 'react';

interface ITask {
    application: string;
    icon: string;
    id: string;
    themeColor: string;
    title: string;
}

export interface ITasksProps {
    focus: (instance: string) => IFocusWindowAction;
    tasks: ITask[];
    startApplication: (url: string) => IStartApplicationAction;
}

export interface ITasksState {}

type TasksProps = ITasksProps & WithStyles;

class Tasks extends Component<TasksProps, ITasksState> {

    public render() {
        const { tasks } = this.props.classes;

        return (
            <Fragment>
                <ul className={tasks}>
                    {this.renderTasks()}
                </ul>
            </Fragment>
        );
    }

    protected renderTasks() {
        const { classes, focus, tasks } = this.props;

        return tasks.map((task, index) => {
            const handleClick = (event: MouseEvent<HTMLElement>) => {
                focus(task.id);
            };

            const taskBackground: CSSProperties  = {
                backgroundColor: task.themeColor,
            };

            return (
                <li key={index} className={classes.task} style={taskBackground} onClick={handleClick}>
                    <img src={task.icon} className={classes.taskIcon} />
                </li>
            );
        });
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        task: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                height: '9vw',
                marginLeft: '1.5vw',
                marginTop: '1.5vw',
                width: '9vw',
            },
            [theme.breakpoints.up('lg')]: {
                display: 'block',
                height: '3vw',
                marginLeft: '.2vw',
                marginTop: '.5vw',
                width: '3vw',
            },
            borderRadius: '5% 20% 5%',
            cursor: 'pointer',
            display: 'inline-block',
            height: '18vw',
            listStyleType: 'none',
            marginLeft: '3.5vw',
            marginTop: '3.5vw',
            overflow: 'hidden',
            width: '18vw',
        },
        taskIcon: {
            width: '100%',
        },
        tasks: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                width: '50%',
            },
            flexDirection: 'row',
            margin: '0',
            padding: '0',
        },
    };
};

export default withStyles(style)(Tasks) as ComponentType<ITasksProps>;
