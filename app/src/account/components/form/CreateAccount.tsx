import { useApolloClient, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React from 'react';
import Checkbox from 'ui/components/form/Checkbox';
import TextField from 'ui/components/form/TextField';
import {
    ICreateAccountAction,
} from '../../actions/create';
import CREATE_PROFILE from '../../mutations/createProfile.graphql';

export interface ICreateAccountData {
    name: string;
}

export interface ICreateAccountProps {}

const useStyles = makeStyles({
    buttonContainer: {
        marginTop: '1rem',
    },
    container: {
        textAlign: 'center',
    },
    nameContainer: {
        marginTop: '1rem',
    },
    termsContainer: {
        marginTop: '1rem',
    },
});

const CreateAccount = ({}: ICreateAccountProps) => {
    const classes = useStyles();

    const apolloClient = useApolloClient();
    const [createProfile, { error, data }] = useMutation(CREATE_PROFILE, {
        client: apolloClient,
    });

    const handleSubmit = (values: any) => {
        createProfile({
            variables: {
                name: values.name,
            },
        });
    };

    return (
        <div
            className={classes.container}
        >
            <Formik
                initialValues={{
                    name: '',
                    terms: false,
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div
                        className={classes.nameContainer}
                    >
                        <TextField
                            label={'Name'}
                            name={'name'}
                        />
                    </div>
                    <div
                        className={classes.termsContainer}
                    >
                        <Checkbox
                            color={'primary'}
                            label={'I accept the Terms of Use & Privacy Policy'}
                            name={'terms'}
                        />
                    </div>
                    <div
                        className={classes.buttonContainer}
                    >
                        <Button
                            color={'primary'}
                            type={'submit'}
                            variant={'contained'}
                        >
                            Create Profile
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateAccount;
