import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import React, { Component } from 'react';

interface ISelectionControlsProps {}

interface ISelectionControlsState {
    check1: boolean;
    check2: boolean;
    radio1: boolean;
    radio2: boolean;
    switch1: boolean;
    switch2: boolean;
}

type SelectionControlsProps = ISelectionControlsProps & WithStyles;

class SelectionControls extends Component<SelectionControlsProps, ISelectionControlsState> {

    constructor(props: SelectionControlsProps, context?: any) {
        super(props, context);

        this.toggleRadio1 = this.toggleRadio1.bind(this);
        this.toggleRadio2 = this.toggleRadio2.bind(this);
        this.toggleCheck1 = this.toggleCheck1.bind(this);
        this.toggleCheck2 = this.toggleCheck2.bind(this);
        this.toggleSwitch1 = this.toggleSwitch1.bind(this);
        this.toggleSwitch2 = this.toggleSwitch2.bind(this);

        this.state = {
            check1: true,
            check2: false,
            radio1: true,
            radio2: false,
            switch1: true,
            switch2: false,
        };
    }

    public toggleRadio1() {
        this.setState({
            ...this.state,
            radio1: !this.state.radio1,
        });
    }

    public toggleRadio2() {
        this.setState({
            ...this.state,
            radio2: !this.state.radio2,
        });
    }

    public toggleCheck1() {
        this.setState({
            ...this.state,
            check1: !this.state.check1,
        });
    }

    public toggleCheck2() {
        this.setState({
            ...this.state,
            check2: !this.state.check2,
        });
    }

    public toggleSwitch1() {
        this.setState({
            ...this.state,
            switch1: !this.state.switch1,
        });
    }

    public toggleSwitch2() {
        this.setState({
            ...this.state,
            switch2: !this.state.switch2,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Radio
                    checked={this.state.radio1}
                    onChange={this.toggleRadio1}
                    color="primary"
                />
                <Radio
                    checked={this.state.radio2}
                    onChange={this.toggleRadio2}
                />
                <Checkbox
                    checked={this.state.check1}
                    onChange={this.toggleCheck1}
                    color="primary"
                />
                <Checkbox
                    checked={this.state.check2}
                    onChange={this.toggleCheck2}
                />
                <Switch
                    checked={this.state.switch1}
                    onChange={this.toggleSwitch1}
                    color="primary"
                />
                <Switch
                    checked={this.state.switch2}
                    onChange={this.toggleSwitch2}
                />
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

export default withStyles(style)(SelectionControls);
