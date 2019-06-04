import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { Form, Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import sendDigitalAssetMutation from '../../../mutations/sendDigitalAsset.graphql';
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

export interface ISendDigitalAssetDialogState {}

type SendDigitalAssetDialogProps = ISendDigitalAssetDialogProps & WithStyles;

class SendDigitalAssetDialog extends Component<SendDigitalAssetDialogProps, ISendDigitalAssetDialogState> {

    public componentDidMount() {
        const {
            fetchFee,
            network,
            platform,
        } = this.props;

        fetchFee(platform, network);
    }

    public render() {
        const {
            assetImage,
            assetName,
            closeDialog,
            contract,
            gasPriceFast,
            gasPriceSafeLow,
            open,
            token,
        } = this.props;

        const {
            icon,
        } = this.props.classes;

        return (
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="form-dialog-title"
            >
                <Mutation mutation={sendDigitalAssetMutation}>
                    {(sendDigitalAsset: any) => {
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

                        return (
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
                        );
                    }}
                </Mutation>
            </Dialog>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        icon: {
            marginLeft: '.5rem',
            verticalAlign: 'middle',
        },
    };
};

export default withStyles(style)(SendDigitalAssetDialog);
