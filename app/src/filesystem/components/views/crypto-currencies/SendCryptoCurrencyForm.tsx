import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';
import {
    AddressField,
    Switch,
    TextField,
} from 'ui';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface ISendCryptoCurrencyFormData {
    amount: string;
    fee: string;
    to: string;
}

export interface ISendCryptoCurrencyFormProps {
    onSubmit: (values: ISendCryptoCurrencyFormData) => any;
}

export interface ISendCryptoCurrencyFormState {}

type SendCryptoCurrencyFormProps = ISendCryptoCurrencyFormProps &
    InjectedFormProps<ISendCryptoCurrencyFormData, ISendCryptoCurrencyFormProps> &
    WithStyles;

class SendCryptoCurrencyForm extends Component<SendCryptoCurrencyFormProps, ISendCryptoCurrencyFormState> {

    public render() {
        const {
            classes,
            handleSubmit,
            onSubmit,
        } = this.props;

        return (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.form}>
                    <Field
                        component={AddressField}
                        label='To'
                        name='to'
                    />
                    <Field
                        component={TextField}
                        label='Amount'
                        name='amount'
                    />
                    <div className={classes.fee}>
                        <div>
                            <Field
                                component={Switch}
                                color='primary'
                                name='fee'
                            />
                        </div>
                        <div className={classes.fast}>
                            Fast?
                        </div>
                    </div>
                </div>
            </Form>
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
