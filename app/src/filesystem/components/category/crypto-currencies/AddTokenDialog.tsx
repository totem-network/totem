import { useApolloClient, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React from 'react';
import TextField from 'ui/components/form/TextField';
import ADD_TOKEN from '../../../mutations/addToken.graphql';

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

    const apolloClient = useApolloClient();
    const [addToken, { error, data }] = useMutation(ADD_TOKEN, {
        client: apolloClient,
    });

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
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
        >
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
        </Dialog>
    );
};

export default AddTokenDialog;
