import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
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

class FormTextField extends Component<
    WrappedFieldProps & BaseFieldProps<IFormTextFieldProps> & IFormTextFieldProps,
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
            <FormControl fullWidth={true}>
                <TextField
                    error={error}
                    label={label}
                    value={input.value}
                    {...input}
                    {...custom}
                />
            </FormControl>
        );
    }

}

export default FormTextField;
