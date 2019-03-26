import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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

class SwitchField extends Component<
    WrappedFieldProps & BaseFieldProps<ISwitchFieldProps> & ISwitchFieldProps,
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
            <FormControl fullWidth={true}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={input.value}
                            value={input.value}
                            {...input}
                            {...custom}
                        />
                    }
                    label={label}
                />
            </FormControl>
        );
    }

}

export default SwitchField;
