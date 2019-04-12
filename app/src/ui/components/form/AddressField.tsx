import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Avatar } from 'account';
import React, { Component, FormEvent } from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isAddress } from 'utils/ethereum';

interface IAddressFieldProps {
    input?: any;
    label?: string;
    meta?: {
        touched?: any;
        error?: any;
    };
}

interface IAddressFieldState {
    domain?: string;
    to?: string;
}

type AddressFieldProps = WrappedFieldProps & BaseFieldProps<IAddressFieldProps> & IAddressFieldProps;

class AddressField extends Component<AddressFieldProps, IAddressFieldState> {

    constructor(props: AddressFieldProps, context?: any) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {};
    }

    public handleChange(event: FormEvent<HTMLInputElement>) {
        const to = event.currentTarget.value;

        const {
            input,
        } = this.props;

        input.onChange(event);

        if (isAddress(to)) {
            this.setState({
                to,
            });
        } else if (to.endsWith('.eth')) {
            this.setState({
                domain: to,
            });
        } else {
            if (this.state.to) {
                this.setState({
                    to: undefined,
                });
            }
        }
    }

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
                <TextField
                    error={error}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {this.renderAvatar()}
                            </InputAdornment>
                        ),
                    }}
                    label={label}
                    {...input}
                    onChange={this.handleChange}
                    {...custom}
                />
            </FormControl>
        );
    }

    protected renderAvatar() {
        const {
            domain,
            to,
        } = this.state;

        if (!to && !domain) {
            return (
                <AccountCircle />
            );
        }

        return (
            <div
                style={{
                    width: '24px',
                }}
            >
                <Avatar address={to} domain={domain} noProfile={true} />
            </div>
        );
    }

}

export default AddressField;
