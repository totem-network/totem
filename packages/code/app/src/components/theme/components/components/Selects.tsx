import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface ISelectsProps {}

interface ISelectsState {
    select1: any;
}

type SelectsProps = ISelectsProps & WithStyles;

class Selects extends Component<SelectsProps, ISelectsState> {

    constructor(props: SelectsProps, context?: any) {
        super(props, context);

        this.changeSelect1 = this.changeSelect1.bind(this);

        this.state = {
            select1: '',
        };
    }

    public changeSelect1(event: any) {
        this.setState({
            ...this.state,
            select1: event.target.value,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Select
                    value={this.state.select1}
                    onChange={this.changeSelect1}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
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

export default withStyles(style)(Selects);
