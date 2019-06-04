import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface IExchangeDialogProps {
    closeDialog: () => any;
    open: boolean;
    selectedCurrency: string;
}

export interface IExchangeDialogState {}

type ExchangeDialogProps = IExchangeDialogProps & WithStyles;

class ExchangeDialog extends Component<ExchangeDialogProps, IExchangeDialogState> {

    public render() {
        const {
            closeDialog,
            open,
            selectedCurrency,
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

export default withStyles(style)(ExchangeDialog);
