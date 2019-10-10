import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface ISwitchFieldProps {
    label?: string;
    name: string;
    [key: string]: any;
}

const SwitchField = ({
    label,
    name,
    ...custom
}: ISwitchFieldProps) => {
    const renderSwitch = ({
        field,
    }: FieldProps) => {
        return (
            <FormControlLabel
                control={(
                    <Switch
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
            {renderSwitch}
        </Field>
    );
};

export default SwitchField;
