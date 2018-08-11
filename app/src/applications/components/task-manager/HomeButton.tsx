import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import HomeIcon from '@material-ui/icons/Home';
import React, { Component, ComponentType } from 'react';
import { IHideTaskManagerAction } from './../../actions/taskManager';
import { IMinimizeAllAction } from './../../actions/windows';

interface IHomeButtonProps {
    hideTaskManager: () => IHideTaskManagerAction;
    minimizeAll: () => IMinimizeAllAction;
}

interface IHomeButtonState {}

type HomeButtonProps = IHomeButtonProps & WithStyles;

class HomeButton extends Component<HomeButtonProps, IHomeButtonState> {

    constructor(props: HomeButtonProps, context?: any) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick() {
        const { hideTaskManager, minimizeAll } = this.props;

        hideTaskManager();
        minimizeAll();
    }

    public render() {
        const { homeButton } = this.props.classes;

        return (
            <div className={homeButton} onClick={this.handleClick}>
                <HomeIcon fontSize={'inherit'} />
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        homeButton: {
            background: '#fff',
            borderRadius: '50%',
            bottom: '2vh',
            fontSize: '2.4rem',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, 0)',
        },
    };
};

export default withStyles(style)(HomeButton) as ComponentType<IHomeButtonProps>;
