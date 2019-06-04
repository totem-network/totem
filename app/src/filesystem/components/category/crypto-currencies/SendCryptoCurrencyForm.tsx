import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
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

export interface ISendCryptoCurrencyFormState {}

type SendCryptoCurrencyFormProps = ISendCryptoCurrencyFormProps &
    WithStyles;

class SendCryptoCurrencyForm extends Component<SendCryptoCurrencyFormProps, ISendCryptoCurrencyFormState> {

    public render() {
        const {
            classes,
        } = this.props;

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
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
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
    };
};

export default withStyles(style)(SendCryptoCurrencyForm);
