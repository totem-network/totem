import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';

interface IItemProps {
    children: any;
    onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.down('md')]: {
                margin: theme.spacing(1),
            },
        },
    };
});

const Item = ({
    children,
    onClick,
}: IItemProps) => {
    const classes = useStyles();

    return (
        <IconButton
            className={classes.container}
            color={'inherit'}
            onClick={onClick}
        >
            {children}
        </IconButton>
    );
};

export default Item;
