import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import React, { Component } from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface ISwitchFieldProps {
    input?: any;
    label?: string;
    meta?: {
        touched?: any;
        error?: any;
    };
}

interface ISwitchFieldState {}

type SwitchFieldProps = SwitchProps &
    WrappedFieldProps &
    BaseFieldProps<ISwitchFieldProps> &
    ISwitchFieldProps;

class SwitchField extends Component<
    SwitchFieldProps,
    ISwitchFieldState
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
            <Switch
                checked={input.value}
                value={input.value}
                {...input}
                {...custom}
            />
        );
    }

}

export default SwitchField;
