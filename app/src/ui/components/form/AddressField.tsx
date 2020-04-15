import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from 'account/components/Avatar';
import { Field, FieldProps } from 'formik';
import React, {
    ChangeEvent,
    useState,
} from 'react';
import { isAddress } from 'utils/ethereum';

interface IAddressFieldProps {
    label: string;
    name: string;
}

const AddressField = ({
    label,
    name,
    ...custom
}: IAddressFieldProps) => {
    const [domain, setDomain] = useState<string | undefined>(undefined);
    const [to, setTo] = useState<string | undefined>(undefined);

    const handleChange = (onChange: any, event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value;

        onChange(event);

        if (isAddress(inputValue)) {
            setDomain(undefined);
            setTo(inputValue);
        } else if (inputValue.endsWith('.eth')) {
            setTo(undefined);
            setDomain(inputValue);
        } else {
            setDomain(undefined);
            setTo(undefined);
        }
    };

    const avatar = (!to && !domain) ? (
            <AccountCircle />
        ) : (
            <div
                style={{
                    width: '24px',
                }}
            >
                <Avatar address={to} domain={domain} noProfile={true} />
            </div>
        );

    const renderAddressField = ({
        field,
        form: {
            errors,
        },
    }: FieldProps) => {
        return (
            <TextField
                error={(errors[field.name] !== undefined && errors[field.name] !== '')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {avatar}
                        </InputAdornment>
                    ),
                }}
                label={label}
                {...field}
                onChange={handleChange.bind(null, field.onChange)}
                {...custom}
            />
        );
    };

    return (
        <Field name={name}>
            {renderAddressField}
        </Field>
    );
};

export default AddressField;
