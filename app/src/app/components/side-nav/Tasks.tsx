import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import {
    IFocusWindowAction,
    IStartApplicationAction,
    StartApplicationDialog,
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

export interface ITasksState {
    taskDialog: boolean;
    taskUrl: string;
}

type TasksProps = ITasksProps & WithStyles;

class Tasks extends Component<TasksProps, ITasksState> {

    constructor(props: TasksProps, context: any) {
        super(props, context);

        this.state = {
            taskDialog: false,
            taskUrl: '',
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.changeUrl = this.changeUrl.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    public openDialog() {
        this.setState({
            ...this.state,
            taskDialog: true,
        });
    }

    public closeDialog() {
        this.setState({
            ...this.state,
            taskDialog: false,
        });
    }

    public changeUrl(event: any) {
        this.setState({
            ...this.state,
            taskUrl: event.target.value,
        });
    }

    public addTask() {
        this.props.startApplication(this.state.taskUrl);
        this.setState({
            taskDialog: false,
            taskUrl: '',
        });
    }

    public render() {
        const { taskDialog } = this.state;
        const { addTask, tasks } = this.props.classes;

        return (
            <Fragment>
                <ul className={tasks}>
                    {this.renderTasks()}
                    <li className={addTask} onClick={this.openDialog}>
                        +
                    </li>
                </ul>
                <StartApplicationDialog
                    open={taskDialog}
                    changeUrl={this.changeUrl}
                    closeHandler={this.closeDialog}
                    startApplication={this.addTask}
                />
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
        addTask: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                fontSize: '8vw',
                height: 'calc(9vw - 4px)',
                lineHeight: '7vw',
                marginLeft: '1.5vw',
                marginTop: '1.5vw',
                width: 'calc(9vw - 4px)',
            },
            [theme.breakpoints.up('lg')]: {
                display: 'block',
                fontSize: '3vw',
                height: 'calc(3vw - 4px)',
                lineHeight: '2.7vw',
                marginLeft: '.2vw',
                marginTop: '.5vw',
                width: 'calc(3vw - 4px)',
            },
            border: '2px solid #ccc',
            borderRadius: '5% 20% 5%',
            color: '#ccc',
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '16vw',
            height: 'calc(18vw - 4px)',
            lineHeight: '14vw',
            listStyleType: 'none',
            marginLeft: '3.5vw',
            marginTop: '3.5vw',
            opacity: 0.5,
            overflow: 'hidden',
            textAlign: 'center',
            width: 'calc(18vw - 4px)',
        },
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
