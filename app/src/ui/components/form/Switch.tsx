import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Field, FieldProps } from 'formik';
import React, { Component } from 'react';

interface ISwitchFieldProps {
    label?: string;
    name: string;
    [key: string]: any;
}

interface ISwitchFieldState {}

class SwitchField extends Component<ISwitchFieldProps, ISwitchFieldState> {

    constructor(props: ISwitchFieldProps, context?: any) {
        super(props, context);

        this.renderSwitch = this.renderSwitch.bind(this);
    }

    public render() {
        const {
            name,
        } = this.props;

        return (
            <Field name={name}>
                {this.renderSwitch}
            </Field>
        );
    }

    public renderSwitch({
        field,
    }: FieldProps) {
        const {
            label,
            ...custom
        } = this.props;

        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={field.value}
                        {...field}
                        {...custom}
                    />
                }
                label={label}
            />
        );
    }

}

export default SwitchField;
