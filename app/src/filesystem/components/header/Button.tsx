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

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        button: {
            background: theme.palette.primary.main,
            border: 0,
            borderRadius: '.6rem',
            color: theme.palette.primary.contrastText,
            cursor: 'pointer',
            fontSize: '.8rem',
            margin: '.5rem',
            outline: '0',
            padding: '.1rem .5rem',
            pointerEvents: 'auto',
            textDecoration: 'none',
        },
    };
};

export default withStyles(style)(Button);
