import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface ITaskTitleProps {
    icon: string;
    offset: number;
    themeColor: string;
    title: string;
}

const useStyles = makeStyles({
    taskIcon: {
        borderRadius: '5% 20% 5%',
        display: 'inline-block',
        height: '3rem',
        marginRight: '1rem',
        width: '3rem',
    },
    taskInfo: {
        display: 'flex',
        position: 'absolute',
        top: '6vh',
    },
});

const TaskTitle = ({
    icon,
    offset,
    themeColor,
    title,
}: ITaskTitleProps) => {
    const classes = useStyles();

    const taskIconStyle = {
        background: themeColor,
    };

    const offsetStyle = {
        left: offset * 75 + 20 + 'vw',
    };

    return (
        <div className={classes.taskInfo} style={offsetStyle}>
            <div className={classes.taskIcon} style={taskIconStyle}>
                <img src={icon} width='100%' />
            </div>
            {title}
        </div>
    );
};

export default TaskTitle;
