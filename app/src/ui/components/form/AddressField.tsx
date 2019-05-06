import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Avatar } from 'account';
import { Field, FieldProps } from 'formik';
import React, {
    ChangeEvent,
    Component,
} from 'react';
import { isAddress } from 'utils/ethereum';

interface IAddressFieldProps {
    label: string;
    name: string;
}

interface IAddressFieldState {
    domain?: string;
    to?: string;
}

class AddressField extends Component<IAddressFieldProps, IAddressFieldState> {

    constructor(props: IAddressFieldProps, context?: any) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.renderAddressField = this.renderAddressField.bind(this);

        this.state = {};
    }

    public handleChange(onChange: any, event: ChangeEvent<HTMLInputElement>) {
        const to = event.currentTarget.value;

        onChange(event);

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
            name,
        } = this.props;

        return (
            <Field name={name}>
                {this.renderAddressField}
            </Field>
        );
    }

    public renderAddressField({
        field,
        form: {
            errors,
        },
    }: FieldProps) {
        const {
            label,
            ...custom
        } = this.props;

        return (
            <TextField
                error={(errors[field.name] !== undefined && errors[field.name] !== '')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {this.renderAvatar()}
                        </InputAdornment>
                    ),
                }}
                label={label}
                {...field}
                onChange={this.handleChange.bind(this, field.onChange)}
                {...custom}
            />
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
