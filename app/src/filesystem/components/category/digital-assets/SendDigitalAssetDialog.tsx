import { useApolloClient, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import SEND_DIGITAL_ASSET from '../../../mutations/sendDigitalAsset.graphql';
import SendDigitalAssetForm from './SendDigitalAssetForm';

export interface ISendDigitalAssetDialogProps {
    assetImage: string;
    assetName: string;
    closeDialog: () => any;
    contract: string;
    fetchFee: (platform: string, network: string) => any;
    gasPriceFast: string;
    gasPriceSafeLow: string;
    network: string;
    open: boolean;
    platform: string;
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
    fetchFee,
    gasPriceFast,
    gasPriceSafeLow,
    network,
    open,
    platform,
    token,
}: ISendDigitalAssetDialogProps) => {
    const classes = useStyles();

    const apolloClient = useApolloClient();
    const [sendDigitalAsset, { error, data }] = useMutation(SEND_DIGITAL_ASSET, {
        client: apolloClient,
    });

    const handleSubmit = (values: any) => {
        let fee = gasPriceSafeLow;
        if (values.fee) {
            fee = gasPriceFast;
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

    useEffect(() => {
        // TODO: fetch fee via graphql
        fetchFee(platform, network);
    }, []);

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
