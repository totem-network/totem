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
} from 'ui';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface ISendDigitalAssetFormData {
    fee: string;
    to: string;
}

export interface ISendDigitalAssetFormProps {
    assetImage: string;
    onSubmit: (values: ISendDigitalAssetFormData) => any;
    token: string;
}

export interface ISendDigitalAssetFormState {}

type SendDigitalAssetFormProps = ISendDigitalAssetFormProps &
    InjectedFormProps<ISendDigitalAssetFormData, ISendDigitalAssetFormProps> &
    WithStyles;

class SendDigitalAssetForm extends Component<SendDigitalAssetFormProps, ISendDigitalAssetFormState> {

    public render() {
        const {
            assetImage,
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
                    <img
                        className={classes.asset}
                        src={assetImage}
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
    };
};

export default withStyles(style)(SendDigitalAssetForm);
