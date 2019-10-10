import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from 'account';
import QRCode from 'qrcode.react';
import React from 'react';

export interface IRecieveDialogProps {
    address: string;
    closeDialog: () => any;
    open: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
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
});

const RecieveDialog = ({
    address,
    closeDialog,
    open,
}: IRecieveDialogProps) => {
    const classes = useStyles();

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
                <div className={classes.qrcodeContainer}>
                    <QRCode value={address} />
                </div>
                <div className={classes.addressContainer}>
                    {address}
                </div>
                <div className={classes.blockieContainer}>
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
};

export default RecieveDialog;
