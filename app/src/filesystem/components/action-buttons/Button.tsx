import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface IButtonProps {
    children: any;
    onClick?: () => any;
}

const useStyles = makeStyles((theme: Theme) => {
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
});

const Button = ({
    children,
    onClick,
}: IButtonProps) => {
    const classes = useStyles();

    return (
        <button
            className={classes.button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
