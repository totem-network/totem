import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from 'ui';
import { loginPrivateKey } from '../../actions/login';
import validate from '../../validators/loginPrivateKey';

export interface ILoginPrivateKeyData {
    privateKey: string;
}

export interface ILoginPrivateKeyProps {}

const useStyles = makeStyles({
    buttonWrapper: {
        marginTop: '2rem',
    },
});

const LoginPrivateKey = ({}: ILoginPrivateKeyProps) => {
    const dispatch = useDispatch();

    const classes = useStyles();

    const handleSubmit = (values: any) => {
        const privateKey = values.privateKey;

        dispatch(loginPrivateKey(privateKey));
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
                        Sign In
                    </Button>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginPrivateKey;
