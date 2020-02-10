import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import instanceCategorySelector from '../../selectors/instanceCategory';
import CryptoCurrencies from './crypto-currencies/View';
import DigitalAssets from './digital-assets/View';
import Images from './images/View';

export interface IViewsProps {
    instance: string;
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
    instance,
}: IViewsProps) => {
    const instanceCategory = useSelector((state) => {
        return instanceCategorySelector(state, instance);
    }, shallowEqual);

    const classes = useStyles();

    const renderCategory = () => {
        switch (instanceCategory) {
            case 'crypto-currencies':
                return (
                    <CryptoCurrencies
                        instance={instance}
                    />
                );
            case 'digital-assets':
                return (
                    <DigitalAssets
                        instance={instance}
                    />
                );
            case 'images':
                return (
                    <Images
                        instance={instance}
                    />
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
