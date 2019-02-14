import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface ITaskTitleProps {
    icon: string;
    offset: number;
    themeColor: string;
    title: string;
}

interface ITaskTitleState {}

type TaskTitleProps = ITaskTitleProps & WithStyles;

class TaskTitle extends Component<TaskTitleProps, ITaskTitleState> {

    public render() {
        const { icon, offset, themeColor, title } = this.props;
        const { taskInfo, taskIcon } = this.props.classes;

        const taskIconStyle = {
            background: themeColor,
        };

        const offsetStyle = {
            left: offset * 75 + 20 + 'vw',
        };

        return (
            <div className={taskInfo} style={offsetStyle}>
                <div className={taskIcon} style={taskIconStyle}>
                    <img src={icon} width='100%' />
                </div>
                {title}
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
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
    };
};

export default withStyles(style)(TaskTitle);
