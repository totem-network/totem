import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface ISteppersProps {}

interface ISteppersState {
    stepper1: number;
}

type SteppersProps = ISteppersProps & WithStyles;

class Steppers extends Component<SteppersProps, ISteppersState> {

    constructor(props: SteppersProps, context?: any) {
        super(props, context);

        this.next1 = this.next1.bind(this);
        this.prev1 = this.prev1.bind(this);

        this.state = {
            stepper1: 0,
        };
    }

    public next1() {
        this.setState({
            ...this.state,
            stepper1: this.state.stepper1 + 1,
        });
    }

    public prev1() {
        this.setState({
            ...this.state,
            stepper1: this.state.stepper1 - 1,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Stepper activeStep={this.state.stepper1}>
                    <Step completed={(this.state.stepper1 >= 1)}>
                        <StepLabel>Step 1</StepLabel>
                    </Step>
                    <Step completed={(this.state.stepper1 >= 2)}>
                        <StepLabel>Step 2</StepLabel>
                    </Step>
                    <Step completed={(this.state.stepper1 >= 3)}>
                        <StepLabel>Step 3</StepLabel>
                    </Step>
                </Stepper>
                <div>
                    <Button
                        disabled={this.state.stepper1 === 0}
                        onClick={this.prev1}
                    >
                        Back
                    </Button>
                    <Button
                        disabled={this.state.stepper1 === 3}
                        onClick={this.next1}
                    >
                        {(this.state.stepper1 >= 2) ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
    };
};

export default withStyles(style)(Steppers);
