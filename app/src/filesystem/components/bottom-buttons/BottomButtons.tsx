import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface IBottomButtonsProps {}

export interface IBottomButtonsState {}

type BottomButtonsProps = IBottomButtonsProps & WithStyles;

class BottomButtons extends Component<BottomButtonsProps, IBottomButtonsState> {

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                {this.props.children}
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            bottom: '0',
            position: 'absolute',
            right: '0',
            textAlign: 'center',
        },
    };
};

export default withStyles(style)(BottomButtons);
