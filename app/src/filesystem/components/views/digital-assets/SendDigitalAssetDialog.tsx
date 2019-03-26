import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, Fragment } from 'react';
import { Mutation } from "react-apollo";
import SendDigitalAssetForm from '../../../containers/views/digital-assets/SendDigitalAssetForm';
import sendDigitalAssetMutation from '../../../mutations/sendDigitalAsset.graphql';

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
    submit: (form: string) => any;
    token: string;
}

export interface ISendDigitalAssetDialogState {}

type SendDigitalAssetDialogProps = ISendDigitalAssetDialogProps & WithStyles;

class SendDigitalAssetDialog extends Component<SendDigitalAssetDialogProps, ISendDigitalAssetDialogState> {

    constructor(props: SendDigitalAssetDialogProps, context?: any) {
        super(props, context);

        this.submit = this.submit.bind(this);
    }

    public componentDidMount() {
        const {
            fetchFee,
            network,
            platform,
        } = this.props;

        fetchFee(platform, network);
    }

    public submit() {
        this.props.submit('sendDigitalAsset');
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
                    {(sendDigitalAsset) => {
                        const handleSubmit = (values: any) => {
                            let fee = gasPriceSafeLow;
                            if (values.get('fee')) {
                                fee = gasPriceFast;
                            }

                            sendDigitalAsset({
                                variables: {
                                    contract,
                                    fee,
                                    to: values.get('to'),
                                    token,
                                },
                            });
                            closeDialog();
                        };

                        return (
                            <Fragment>
                                <DialogTitle>
                                    Send {assetName}
                                </DialogTitle>
                                <DialogContent>
                                    <SendDigitalAssetForm
                                        assetImage={assetImage}
                                        onSubmit={handleSubmit}
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
                                        onClick={this.submit}
                                        variant='contained'
                                    >
                                        Send
                                    </Button>
                                </DialogActions>
                            </Fragment>
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
