import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import Remove from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/styles';
import React, { MouseEvent } from 'react';

interface IButtonsProps {
    backgroundColor: string;
    close: (event: MouseEvent<HTMLElement>) => void;
    color: string;
    minimize: (event: MouseEvent<HTMLElement>) => void;
}

const useStyles = makeStyles({
    button: {
        '&:hover': {
            opacity: 0.7,
        },
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'inline-block',
        listStyle: 'none',
        margin: '0',
        padding: '0',
        transform: 'scale(0.5)',
    },
    container: {
        left: '.5vw',
        margin: '.25rem 0',
        padding: '0',
        position: 'absolute',
    },
});

const Buttons = ({
    backgroundColor,
    close,
    color,
    minimize,
}: IButtonsProps) => {
    const classes = useStyles();

    const blockMouseDown = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    };

    const buttonColors = {
        backgroundColor,
        color,
    };

    return (
        <ul className={classes.container}>
            <li
                className={classes.button}
                style={buttonColors}
                key='close'
                onClick={close}
                onMouseDown={blockMouseDown}
            >
                <Clear />
            </li>
            <li
                className={classes.button}
                style={buttonColors}
                key='maximize'
                onMouseDown={blockMouseDown}
            >
                <Add />
            </li>
            <li
                className={classes.button}
                style={buttonColors}
                key='minimize'
                onClick={minimize}
                onMouseDown={blockMouseDown}
            >
                <Remove />
            </li>
        </ul>
    );
};

export default Buttons;
