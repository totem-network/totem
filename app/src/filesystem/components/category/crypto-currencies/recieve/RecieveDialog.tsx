import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { Avatar } from 'account';
import QRCode from 'qrcode.react';
import React, { Component, Fragment } from 'react';

export interface IRecieveDialogProps {
    address: string;
    closeDialog: () => any;
    open: boolean;
}

export interface IRecieveDialogState {}

type RecieveDialogProps = IRecieveDialogProps & WithStyles;

class RecieveDialog extends Component<RecieveDialogProps, IRecieveDialogState> {

    public render() {
        const {
            address,
            closeDialog,
            open,
        } = this.props;

        const {
            addressContainer,
            blockieContainer,
            qrcodeContainer,
        } = this.props.classes;

        return (
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle>
                    Recieve crypto currencies
                </DialogTitle>
                <DialogContent>
                    <div className={qrcodeContainer}>
                        <QRCode value={address} />
                    </div>
                    <div className={addressContainer}>
                        {address}
                    </div>
                    <div className={blockieContainer}>
                        <Avatar address={address} noProfile={true} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='primary'
                        onClick={closeDialog}
                        variant='contained'
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        addressContainer: {
            color: theme.palette.text.primary,
            margin: '1rem',
        },
        blockieContainer: {
            margin: 'auto',
            width: '20%',
        },
        qrcodeContainer: {
            textAlign: 'center',
            width: '100%',
        },
    };
};

export default withStyles(style)(RecieveDialog);
