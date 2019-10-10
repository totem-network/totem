import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Field, FieldProps } from 'formik';
import React, { useState } from 'react';

interface IFormPasswordProps {
    label: string;
    name: string;
    [key: string]: any;
}

const FormPassword = ({
    label,
    name,
    ...custom
}: IFormPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const renderPasswordField = ({
        field,
        form: {
            errors,
        },
    }: FieldProps) => {
        return (
            <FormControl fullWidth={true}>
                <InputLabel>
                    {label}
                </InputLabel>
                <Input
                    endAdornment={(
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )}
                    error={(errors[field.name] !== undefined && errors[field.name] !== '')}
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    {...custom}
                />
            </FormControl>
        );
    };

    return (
        <Field name={name}>
            {renderPasswordField}
        </Field>
    );
};

export default FormPassword;
