import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { Component } from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface IFormPasswordProps {
    input?: any;
    label?: string;
    meta?: {
        touched?: any;
        error?: any;
    };
}

interface IFormPasswordState {
    showPassword: boolean;
}

type FormPasswordProps = WrappedFieldProps & BaseFieldProps<IFormPasswordProps> & IFormPasswordProps;

class FormPassword extends Component<
    FormPasswordProps,
    IFormPasswordState
> {

    constructor(
        props: WrappedFieldProps & BaseFieldProps<IFormPasswordProps> & IFormPasswordProps,
        context?: any,
    ) {
        super(props, context);

        this.state = {
            showPassword: false,
        };

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
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
            input,
            label,
            meta,
            ...custom
        } = this.props;

        const { showPassword } = this.state;

        let error = false;
        if (meta) {
            if (meta.touched && meta.error) {
                error = true;
            }
        }

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
                    error={error}
                    type={showPassword ? 'text' : 'password'}
                    value={input.value}
                    {...input}
                    {...custom}
                />
            </FormControl>
        );
    }

}

export default FormPassword;
