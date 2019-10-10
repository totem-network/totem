import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
    AddressField,
    Switch,
} from 'ui';

export interface ISendDigitalAssetFormData {
    fee: string;
    to: string;
}

export interface ISendDigitalAssetFormProps {
    assetImage: string;
    token: string;
}

const useStyles = makeStyles({
    asset: {
        maxWidth: '250px',
    },
    fast: {
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '.8rem 0',
    },
    fee: {
        display: 'flex',
        float: 'right',
    },
    form: {
        maxWidth: '260px',
    },
});

const SendDigitalAssetForm = ({
    assetImage,
    token,
}: ISendDigitalAssetFormProps) => {
    const classes = useStyles();

    return (
        <div className={classes.form}>
            <AddressField
                label='To'
                name='to'
            />
            <img
                className={classes.asset}
                src={assetImage}
            />
            <div className={classes.fee}>
                <div>
                    <Switch
                        color='primary'
                        name='fee'
                    />
                </div>
                <div className={classes.fast}>
                    Fast?
                </div>
            </div>
        </div>
    );
};

export default SendDigitalAssetForm;
