import TextField from '@material-ui/core/TextField';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface IFormTextFieldProps {
    label: string;
    name: string;
    [key: string]: any;
}

const FormTextField = ({
    label,
    name,
    ...custom
}: IFormTextFieldProps) => {
    const renderTextField = ({
        field,
        form: {
            errors,
        },
    }: FieldProps) => {
        return (
            <TextField
                error={(errors[field.name] !== undefined && errors[field.name] !== '')}
                label={label}
                {...field}
                {...custom}
            />
        );
    };

    return (
        <Field name={name}>
            {renderTextField}
        </Field>
    );
};

export default FormTextField;
