import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Field, FieldProps } from 'formik';
import React, { Component } from 'react';

interface IFormPasswordProps {
    label: string;
    name: string;
    [key: string]: any;
}

interface IFormPasswordState {
    showPassword: boolean;
}

class FormPassword extends Component<IFormPasswordProps, IFormPasswordState> {

    constructor(
        props: IFormPasswordProps,
        context?: any,
    ) {
        super(props, context);

        this.state = {
            showPassword: false,
        };

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.renderPasswordField = this.renderPasswordField.bind(this);
    }

    public handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }

    public handleMouseDownPassword(event: any) {
        event.preventDefault();
    }

    public render() {
        const {
            name,
        } = this.props;

        return (
            <Field name={name}>
                {this.renderPasswordField}
            </Field>
        );
    }

    public renderPasswordField({
        field,
        form: {
            errors,
        },
    }: FieldProps) {
        const {
            label,
            ...custom
        } = this.props;

        const { showPassword } = this.state;

        return (
            <FormControl fullWidth={true}>
                <InputLabel>
                    {label}
                </InputLabel>
                <Input
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    error={(errors[field.name] !== undefined && errors[field.name] !== '')}
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    {...custom}
                />
            </FormControl>
        );
    }

}

export default FormPassword;
