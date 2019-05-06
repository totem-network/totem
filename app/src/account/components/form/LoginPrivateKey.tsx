import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { Form, Formik } from 'formik';
import React, { Component } from 'react';
import { TextField } from 'ui';
import {
    ILoginPrivateKeyAction,
} from '../../actions/login';
import validate from '../../validators/loginPrivateKey';

export interface ILoginPrivateKeyData {
    privateKey: string;
}

export interface ILoginPrivateKeyProps {
    login: (privateKey: string) => ILoginPrivateKeyAction;
}

type LoginPrivateKeyProps = ILoginPrivateKeyProps &
    WithStyles;

class LoginPrivateKey extends Component<LoginPrivateKeyProps> {

    constructor(
        props: LoginPrivateKeyProps,
        context?: any,
    ) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(values: any) {
        const privateKey = values.privateKey;

        this.props.login(privateKey);
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper } = this.props.classes;

        return (
            <Formik
                initialValues={{
                    privateKey: '',
                }}
                onSubmit={this.handleSubmit}
            >
                <Form>
                    <div>
                        <TextField
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
            </Formik>
        );
    }
}

const style: StyleRules = {
    buttonWrapper: {
        marginTop: '2rem',
    },
};

export default withStyles(style)(LoginPrivateKey);
