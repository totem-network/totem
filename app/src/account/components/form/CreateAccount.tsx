import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React from 'react';
import {
    ICreateAccountAction,
} from './../../actions/create';

export interface ICreateAccountData {
    name: string;
}

export interface ICreateAccountProps {
    createAccount: () => ICreateAccountAction;
}

const useStyles = makeStyles({
    buttonWrapper: {
        marginTop: '2rem',
    },
});

const CreateAccount = ({
    createAccount,
}: ICreateAccountProps) => {
    const classes = useStyles();

    const handleSubmit = () => {
        createAccount();
    };

    return (
        <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className={classes.buttonWrapper}>
                    <Button type='submit' color='primary' variant="contained">
                        Create Profile
                    </Button>
                </div>
            </Form>
        </Formik>
    );
};

export default CreateAccount;
