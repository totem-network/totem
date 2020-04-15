import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chip from '@material-ui/core/Chip';
import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import useWidth from 'ui/hooks/useWidth';

export interface IButtonProps {
    icon?: any;
    label: string;
    onClick?: () => any;
}

const useStyles = makeStyles({
    button: {
        cursor: 'pointer',
        margin: '.5rem',
        pointerEvents: 'auto',
    },
});

const Button = ({
    icon,
    label,
    onClick,
}: IButtonProps) => {
    const classes = useStyles();
    const width = useWidth();

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
            className={classes.button}
            color="primary"
            icon={icon}
            onClick={onClick}
            label={label}
        />
    );
};

export default Button;
