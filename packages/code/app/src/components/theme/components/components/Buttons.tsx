import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IButtonsProps {}

interface IButtonsState {}

type ButtonsProps = IButtonsProps & WithStyles;

class Buttons extends Component<ButtonsProps, IButtonsState> {

    public render() {
        const {
            button,
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Button variant="contained" className={button}>
                    Default
                </Button>
                <Button variant="contained" color="primary" className={button}>
                    Primary
                </Button>
                <Button variant="contained" color="secondary" className={button}>
                    Secondary
                </Button>
                <Button variant="contained" color="secondary" disabled={true} className={button}>
                    Disabled
                </Button>
                <Button className={button}>Default</Button>
                <Button color="primary" className={button}>
                    Primary
                </Button>
                <Button color="secondary" className={button}>
                    Secondary
                </Button>
                <Button disabled={true} className={button}>
                    Disabled
                </Button>
                <Button variant="outlined" className={button}>
                    Default
                </Button>
                <Button variant="outlined" color="primary" className={button}>
                    Primary
                </Button>
                <Button variant="outlined" color="secondary" className={button}>
                    Secondary
                </Button>
                <Button variant="outlined" disabled={true} className={button}>
                    Disabled
                </Button>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        button: {
            margin: '.5rem',
        },
        container: {
            margin: '1rem',
        },
    };
};

export default withStyles(style)(Buttons);
