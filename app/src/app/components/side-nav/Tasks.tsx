import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import {
    focusWindow,
    instancesSelector,
    startApplication,
} from 'applications';
import React, {
    CSSProperties,
    MouseEvent,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

interface ITask {
    application: string;
    icon: string;
    id: string;
    themeColor: string;
    title: string;
}

export interface ITasksProps {}

const useStyles = makeStyles((theme: Theme) => {
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
});

const Tasks = ({}: ITasksProps) => {
    const tasks: ITask[] = useSelector(instancesSelector, shallowEqual);

    const dispatch = useDispatch();

    const classes = useStyles();

    const taskComponents = tasks.map((task, index) => {
        const handleClick = (event: MouseEvent<HTMLElement>) => {
            dispatch(focusWindow(task.id));
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

    return (
        <>
            <ul className={classes.tasks}>
                {taskComponents}
            </ul>
        </>
    );
};

export default Tasks;
