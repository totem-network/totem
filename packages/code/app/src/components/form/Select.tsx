import FormControl from '@material-ui/core/FormControl';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface IFormSelectProps {
    input?: any;
    label?: string;
    meta?: {
        touched?: any;
        error?: any;
    };
    options: any;
}

interface IFormSelectState {}

type FormSelectProps = TextFieldProps &
    WrappedFieldProps &
    BaseFieldProps<IFormSelectProps> &
    IFormSelectProps;

class FormSelect extends Component<
    FormSelectProps,
    IFormSelectState
> {

    public render() {

        const {
            input,
            label,
            meta,
            options,
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
                select={true}
                value={input.value}
                {...input}
                {...custom}
            >
                {options}
            </TextField>
        );
    }

}

export default FormSelect;
