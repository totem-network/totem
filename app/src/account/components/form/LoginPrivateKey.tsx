import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';
import {
    PasswordField,
    TextField,
 } from 'ui';
import {
    ILoginPrivateKeyAction,
} from './../../actions/login';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface ILoginPrivateKeyData {
    privateKey: string;
}

export interface ILoginPrivateKeyProps {
    handleSubmit?: any;
    login: (privateKey: string) => ILoginPrivateKeyAction;
}

type LoginPrivateKeyProps = ILoginPrivateKeyProps &
    InjectedFormProps<ILoginPrivateKeyData, ILoginPrivateKeyProps> &
    WithStyles;

class LoginPrivateKey extends Component<LoginPrivateKeyProps> {

    constructor(
        props: LoginPrivateKeyProps,
        context?: any,
    ) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(values: any) {
        const privateKey = values.get('privateKey');

        this.props.login(privateKey);
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper } = this.props.classes;

        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div>
                    <Field
                        component={TextField}
                        label='Private Key'
                        multiline={true}
                        name='privateKey'
                        rows={4}
                    />
                </div>
                <div className={buttonWrapper}>
                    <Button type='submit'>
                        Login
                    </Button>
                </div>
            </Form>
        );
    }
}

const style: StyleRules = {
    buttonWrapper: {
        marginTop: '2rem',
    },
};

export default withStyles(style)(LoginPrivateKey);
