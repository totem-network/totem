import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface ICheckboxFieldProps {
    label?: string;
    name: string;
    [key: string]: any;
}

const CheckboxField = ({
    label,
    name,
    ...custom
}: ICheckboxFieldProps) => {
    const renderCheckbox = ({
        field,
    }: FieldProps) => {
        return (
            <FormControlLabel
                control={(
                    <Checkbox
                        checked={field.value}
                        {...field}
                        {...custom}
                    />
                )}
                label={label}
            />
        );
    };

    return (
        <Field name={name}>
            {renderCheckbox}
        </Field>
    );
};

export default CheckboxField;
