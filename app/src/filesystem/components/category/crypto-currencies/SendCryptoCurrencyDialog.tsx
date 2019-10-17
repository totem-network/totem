import { useApolloClient, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { utils } from 'ethers';
import { Form, Formik } from 'formik';
import React from 'react';
import SEND_CRYPTO_CURRENCY from '../../../mutations/sendCryptoCurrency.graphql';
import SendCryptoCurrencyForm from './SendCryptoCurrencyForm';

export interface ISendCryptoCurrencyDialogProps {
    closeDialog: () => any;
    currencyName: string;
    currencyIcon: string;
    currencyOrToken: string;
    decimals: number;
    feeFast: string;
    feeSafeLow: string;
    open: boolean;
}

const useStyles = makeStyles({
    icon: {
        marginLeft: '.5rem',
        verticalAlign: 'middle',
    },
});

const SendCryptoCurrencyDialog = ({
    closeDialog,
    currencyIcon,
    currencyName,
    currencyOrToken,
    decimals,
    feeFast,
    feeSafeLow,
    open,
}: ISendCryptoCurrencyDialogProps) => {
    const classes = useStyles();

    const apolloClient = useApolloClient();
    const [sendCryptoCurrency, { error, data }] = useMutation(SEND_CRYPTO_CURRENCY, {
        client: apolloClient,
    });

    const handleSubmit = (values: any) => {
        let fee = feeSafeLow;
        if (values.fee) {
            fee = feeFast;
        }

        const amount = utils.parseUnits(
            values.amount,
            decimals,
        ).toString();

        sendCryptoCurrency({
            variables: {
                amount,
                currencyOrToken,
                fee,
                to: values.to,
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
                    amount: '',
                    fee: false,
                    to: '',
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <DialogTitle>
                        Send {currencyName}
                        <object data={currencyIcon} className={classes.icon}>
                            <img
                                src='/images/cryptocurrency-icons/generic.svg'
                                className={classes.icon}
                            />
                        </object>
                    </DialogTitle>
                    <DialogContent>
                        <SendCryptoCurrencyForm />
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

export default SendCryptoCurrencyDialog;
