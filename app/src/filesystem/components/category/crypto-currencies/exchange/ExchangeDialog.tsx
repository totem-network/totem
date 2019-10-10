import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export interface IExchangeDialogProps {
    closeDialog: () => any;
    open: boolean;
    selectedCurrency: string;
}

const ExchangeDialog = ({
    closeDialog,
    open,
    selectedCurrency,
}: IExchangeDialogProps) => {
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
                TODO
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    onClick={closeDialog}
                    variant='contained'
                >
                    Exchange
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExchangeDialog;
