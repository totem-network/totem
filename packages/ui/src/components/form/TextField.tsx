import FormControl from '@material-ui/core/FormControl';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface IFormTextFieldProps {
    input?: any;
    label?: string;
    meta?: {
        touched?: any;
        error?: any;
    };
}

interface IFormTextFieldState {}

type FormTextFieldProps = TextFieldProps &
    WrappedFieldProps &
    BaseFieldProps<IFormTextFieldProps> &
    IFormTextFieldProps;

class FormTextField extends Component<
    FormTextFieldProps,
    IFormTextFieldState
> {

    public render() {

        const {
            input,
            label,
            meta,
            ...custom
        } = this.props;

        let error = false;
        if (meta) {
            if (meta.touched && meta.error) {
                error = true;
            }
        }

        return (
            <TextField
                error={error}
                label={label}
                value={input.value}
                {...input}
                {...custom}
            />
        );
    }

}

export default FormTextField;
