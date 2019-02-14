import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import CryptoCurrencies from './CryptoCurrencies';

export interface ITypesProps {}

export interface ITypesState {}

type TypesProps = ITypesProps & WithStyles;

class Types extends Component<TypesProps, ITypesState> {

    public render() {
        const { container } = this.props.classes;

        return (
            <div className={container}>
                <CryptoCurrencies />
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                width: '50%',
            },
            bottom: 0,
            color: '#333',
            flexDirection: 'row',
            left: '220px',
            margin: '0',
            padding: '2rem 0 0 0',
            position: 'absolute',
            right: 0,
            top: 0,
        },
    };
};

export default withStyles(style)(Types);
