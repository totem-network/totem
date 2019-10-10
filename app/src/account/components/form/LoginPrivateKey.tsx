import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React from 'react';
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

const useStyles = makeStyles({
    buttonWrapper: {
        marginTop: '2rem',
    },
});

const LoginPrivateKey = ({
    login,
}: ILoginPrivateKeyProps) => {
    const classes = useStyles();

    const handleSubmit = (values: any) => {
        const privateKey = values.privateKey;

        login(privateKey);
    };

    return (
        <Formik
            initialValues={{
                privateKey: '',
            }}
            onSubmit={handleSubmit}
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
                <div className={classes.buttonWrapper}>
                    <Button type='submit'>
                        Login
                    </Button>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginPrivateKey;
