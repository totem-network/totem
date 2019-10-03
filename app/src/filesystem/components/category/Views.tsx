import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import CryptoCurrencies from '../../containers/category/CryptoCurrencies';
import DigitalAssets from '../../containers/category/DigitalAssets';
import Images from '../../containers/category/Images';

export interface IViewsProps {
    instanceCategory: string;
}

export interface IViewsState {}

type ViewsProps = IViewsProps & WithStyles;

class Views extends Component<ViewsProps, IViewsState> {

    public render() {
        const { container } = this.props.classes;

        return (
            <div className={container}>
                {this.renderCategory()}
            </div>
        );
    }

    protected renderCategory() {
        const { instanceCategory } = this.props;

        switch (instanceCategory) {
            case 'crypto-currencies':
                return (
                    <CryptoCurrencies />
                );
            case 'digital-assets':
                return (
                    <DigitalAssets />
                );
            case 'images':
                return (
                    <Images />
                );
        }
    }

}

const style: StyleRulesCallback<Theme, IViewsProps> = (theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                left: '220px',
            },
            bottom: 0,
            color: '#333',
            left: 0,
            margin: '0',
            padding: '2rem 0 0 0',
            position: 'absolute',
            right: 0,
            top: 0,
        },
    };
};

export default withStyles(style)(Views);
