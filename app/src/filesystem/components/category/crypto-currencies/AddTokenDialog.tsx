import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { TextField } from 'ui';
import addTokenMutation from '../../../mutations/addToken.graphql';

export interface IAddTokenDialogProps {
    closeDialog: () => any;
    open: boolean;
}

const useStyles = makeStyles({
    price: {
        padding: '4px 24px',
    },
});

const AddTokenDialog = ({
    closeDialog,
    open,
}: IAddTokenDialogProps) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
        >
            <Mutation mutation={addTokenMutation}>
                {(addToken: any) => {
                    const handleSubmit = (values: any) => {
                        addToken({
                            refetchQueries: [
                                'cryptoCurrencies',
                            ],
                            variables: {
                                contract: values.contract,
                            },
                        });
                        closeDialog();
                    };

                    return (
                        <Formik
                            initialValues={{
                                contract: '',
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <DialogTitle>
                                    Add token
                                </DialogTitle>
                                <DialogContent>
                                    <TextField
                                        label='Address or ENS'
                                        name='contract'
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={closeDialog}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color='primary'
                                        type='submit'
                                        variant='contained'
                                    >
                                        Add Token
                                    </Button>
                                </DialogActions>
                            </Form>
                        </Formik>
                    );
                }}
            </Mutation>
        </Dialog>
    );
};

export default AddTokenDialog;
