import { useApolloClient, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Formik } from 'formik';
import React from 'react';
import TextField from 'ui/components/form/TextField';
import ADD_DIGITAL_ASSET from '../../../mutations/addDigitalAsset.graphql';

export interface IAddDigitalAssetDialogProps {
    closeDialog: () => any;
    open: boolean;
}

const AddDigitalAssetDialog = ({
    closeDialog,
    open,
}: IAddDigitalAssetDialogProps) => {
    const apolloClient = useApolloClient();
    const [addDigitalAsset, { error, data }] = useMutation(ADD_DIGITAL_ASSET, {
        client: apolloClient,
    });

    const handleSubmit = (values: any) => {
        addDigitalAsset({
            refetchQueries: [
                'digitalAsset',
                'digitalAssets',
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
        >
            <Formik
                initialValues={{
                    contract: '',
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <DialogTitle>
                        Add digital asset
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
                            Add asset
                        </Button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    );
};

export default AddDigitalAssetDialog;
