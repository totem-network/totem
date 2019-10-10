import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import CryptoCurrencies from '../../containers/category/CryptoCurrencies';
import DigitalAssets from '../../containers/category/DigitalAssets';
import Images from '../../containers/category/Images';

export interface IViewsProps {
    instanceCategory: string;
}

const useStyles = makeStyles((theme: Theme) => {
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
});

const Views = ({
    instanceCategory,
}: IViewsProps) => {
    const classes = useStyles();

    const renderCategory = () => {
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
    };

    return (
        <div className={classes.container}>
            {renderCategory()}
        </div>
    );
};

export default Views;
