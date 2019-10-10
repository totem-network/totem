import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
    AddressField,
    Switch,
    TextField,
} from 'ui';

export interface ISendCryptoCurrencyFormData {
    amount: string;
    fee: string;
    to: string;
}

export interface ISendCryptoCurrencyFormProps {}

const useStyles = makeStyles({
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

const SendCryptoCurrencyForm = ({}: ISendCryptoCurrencyFormProps) => {
    const classes = useStyles();

    return (
        <div className={classes.form}>
            <AddressField
                label='To'
                name='to'
            />
            <TextField
                label='Amount'
                name='amount'
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

export default SendCryptoCurrencyForm;
