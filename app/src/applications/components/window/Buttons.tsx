import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import Remove from '@material-ui/icons/Remove';
import React, { Component, ComponentType, MouseEvent } from 'react';

interface IButtonsProps {
    backgroundColor: string;
    close: (event: MouseEvent<HTMLElement>) => void;
    color: string;
    minimize: (event: MouseEvent<HTMLElement>) => void;
}

interface IButtonsState {}

type ButtonsProps = IButtonsProps & WithStyles;

class Buttons extends Component<ButtonsProps, IButtonsState> {

    public blockMouseDown(event: MouseEvent<HTMLElement>) {
        event.stopPropagation();
    }

    public render() {
        const { backgroundColor, close, color, minimize } = this.props;
        const { button, container } = this.props.classes;

        const buttonColors = {
            backgroundColor,
            color,
        };

        return (
            <ul className={container}>
                <li
                    className={button}
                    style={buttonColors}
                    key='close'
                    onClick={close}
                    onMouseDown={this.blockMouseDown}
                >
                    <Clear />
                </li>
                <li
                    className={button}
                    style={buttonColors}
                    key='maximize'
                    onMouseDown={this.blockMouseDown}
                >
                    <Add />
                </li>
                <li
                    className={button}
                    style={buttonColors}
                    key='minimize'
                    onClick={minimize}
                    onMouseDown={this.blockMouseDown}
                >
                    <Remove />
                </li>
            </ul>
        );
    }
}

const style: StyleRules = {
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
};

export default withStyles(style)(Buttons) as ComponentType<IButtonsProps>;
