import TextField from '@material-ui/core/TextField';
import { Field, FieldProps } from 'formik';
import React, { Component } from 'react';

interface IFormTextFieldProps {
    label: string;
    name: string;
    [key: string]: any;
}

interface IFormTextFieldState {}

class FormTextField extends Component<IFormTextFieldProps, IFormTextFieldState> {

    constructor(props: IFormTextFieldProps, context?: any) {
        super(props, context);

        this.renderTextField = this.renderTextField.bind(this);
    }

    public render() {
        const {
            name,
        } = this.props;

        return (
            <Field name={name}>
                {this.renderTextField}
            </Field>
        );
    }

    public renderTextField({
        field,
        form: {
            errors,
        },
    }: FieldProps) {
        const {
            label,
            ...custom
        } = this.props;

        return (
            <TextField
                error={(errors[field.name] !== undefined && errors[field.name] !== '')}
                label={label}
                {...field}
                {...custom}
            />
        );
    }

}

export default FormTextField;
