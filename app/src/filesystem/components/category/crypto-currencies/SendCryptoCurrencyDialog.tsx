import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { utils } from 'ethers';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Mutation } from "react-apollo";
import sendCryptoCurrencyMutation from '../../../mutations/sendCryptoCurrency.graphql';
import SendCryptoCurrencyForm from './SendCryptoCurrencyForm';

export interface ISendCryptoCurrencyDialogProps {
    closeDialog: () => any;
    currencyName: string;
    currencyIcon: string;
    currencyOrToken: string;
    decimals: number;
    fetchFee: (platform: string, network: string) => any;
    gasPriceFast: string;
    gasPriceSafeLow: string;
    network: string;
    open: boolean;
    platform: string;
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
    fetchFee,
    gasPriceFast,
    gasPriceSafeLow,
    network,
    open,
    platform,
}: ISendCryptoCurrencyDialogProps) => {
    const classes = useStyles();

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
            <Mutation mutation={sendCryptoCurrencyMutation}>
                {(sendCryptoCurrency: any) => {
                    const handleSubmit = (values: any) => {
                        let fee = gasPriceSafeLow;
                        if (values.fee) {
                            fee = gasPriceFast;
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
                    );
                }}
            </Mutation>
        </Dialog>
    );
};

export default SendCryptoCurrencyDialog;
