import { useApolloClient, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React from 'react';
import SEND_DIGITAL_ASSET from '../../../mutations/sendDigitalAsset.graphql';
import SendDigitalAssetForm from './SendDigitalAssetForm';

export interface ISendDigitalAssetDialogProps {
    assetImage: string;
    assetName: string;
    closeDialog: () => any;
    contract: string;
    feeFast: string;
    feeSafeLow: string;
    open: boolean;
    token: string;
}

const useStyles = makeStyles({
    icon: {
        marginLeft: '.5rem',
        verticalAlign: 'middle',
    },
});

const SendDigitalAssetDialog = ({
    assetImage,
    assetName,
    closeDialog,
    contract,
    feeFast,
    feeSafeLow,
    open,
    token,
}: ISendDigitalAssetDialogProps) => {
    const classes = useStyles();

    const apolloClient = useApolloClient();
    const [sendDigitalAsset, { error, data }] = useMutation(SEND_DIGITAL_ASSET, {
        client: apolloClient,
    });

    const handleSubmit = (values: any) => {
        let fee = feeSafeLow;
        if (values.fee) {
            fee = feeFast;
        }

        sendDigitalAsset({
            variables: {
                contract,
                fee,
                to: values.to,
                token,
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
                    fee: false,
                    to: '',
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <DialogTitle>
                        Send {assetName}
                    </DialogTitle>
                    <DialogContent>
                        <SendDigitalAssetForm
                            assetImage={assetImage}
                            token={token}
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
                            Send
                        </Button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    );
};

export default SendDigitalAssetDialog;
