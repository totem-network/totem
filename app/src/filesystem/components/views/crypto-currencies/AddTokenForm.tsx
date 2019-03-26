import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';
import { TextField } from 'ui';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface IAddTokenFormData {
    contract: string;
}

export interface IAddTokenFormProps {
    onSubmit: (values: IAddTokenFormData) => any;
}

export interface IAddTokenFormState {}

type AddTokenFormProps = IAddTokenFormProps &
    InjectedFormProps<IAddTokenFormData, IAddTokenFormProps> &
    WithStyles;

class AddTokenForm extends Component<AddTokenFormProps, IAddTokenFormState> {

    public render() {
        const {
            handleSubmit,
            onSubmit,
        } = this.props;

        return (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    component={TextField}
                    label='Address or ENS'
                    name='contract'
                />
            </Form>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {};
};

export default withStyles(style)(AddTokenForm);
