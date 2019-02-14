import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface IDigitalAssetsProps {}

export interface IDigitalAssetsState {}

type DigitalAssetsProps = IDigitalAssetsProps & WithStyles;

class DigitalAssets extends Component<DigitalAssetsProps, IDigitalAssetsState> {

    public render() {
        const { categories } = this.props.classes;

        return (
            <div>
                Digital Assets
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        categories: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                width: '50%',
            },
            flexDirection: 'row',
            margin: '2.5rem 1.5rem',
            padding: '0',
        },
    };
};

export default withStyles(style)(DigitalAssets);
