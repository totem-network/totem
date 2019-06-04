import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chip from '@material-ui/core/Chip';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import React, { Component } from 'react';

export interface IButtonProps {
    icon?: any;
    label: string;
    onClick?: () => any;
}

export interface IButtonState {}

type ButtonProps = IButtonProps & WithStyles & WithWidth;

class Button extends Component<ButtonProps, IButtonState> {

    public render() {
        const {
            icon,
            label,
            onClick,
            width,
        } = this.props;

        const {
            button,
        } = this.props.classes;

        if (isWidthDown('md', width)) {
            return (
                <BottomNavigationAction
                    icon={icon}
                    label={label}
                    showLabel={true}
                />
            );
        }

        return (
            <Chip
                className={button}
                color="primary"
                icon={icon}
                onClick={onClick}
                label={label}
            />
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        button: {
            cursor: 'pointer',
            margin: '.5rem',
            pointerEvents: 'auto',
        },
    };
};

export default withStyles(style)(
    withWidth()(Button),
);
