import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface IButtonProps {
    onClick?: () => any;
}

export interface IButtonState {}

type ButtonProps = IButtonProps & WithStyles;

class Button extends Component<ButtonProps, IButtonState> {

    public render() {
        const {
            children,
            onClick,
        } = this.props;
        const {
            button,
        } = this.props.classes;

        return (
            <button
                className={button}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}

const style: StyleRulesCallback<Theme, IButtonProps> = (theme: Theme) => {
    return {
        button: {
            background: theme.palette.primary.main,
            border: 0,
            borderRadius: '.25vw 0 0 0',
            color: theme.palette.primary.contrastText,
            cursor: 'pointer',
            fontSize: '1rem',
            margin: '0',
            padding: '.5rem 1rem',
        },
    };
};

export default withStyles(style)(Button);
