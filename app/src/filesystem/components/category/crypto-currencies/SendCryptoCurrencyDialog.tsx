import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { utils } from 'ethers';
import { Form, Formik } from 'formik';
import React, { Component } from 'react';
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

export interface ISendCryptoCurrencyDialogState {}

type SendCryptoCurrencyDialogProps = ISendCryptoCurrencyDialogProps & WithStyles;

class SendCryptoCurrencyDialog extends Component<SendCryptoCurrencyDialogProps, ISendCryptoCurrencyDialogState> {

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
            closeDialog,
            currencyName,
            currencyIcon,
            currencyOrToken,
            decimals,
            gasPriceFast,
            gasPriceSafeLow,
            open,
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
                                        <object data={currencyIcon} className={icon}>
                                            <img
                                                src='/images/cryptocurrency-icons/generic.svg'
                                                className={icon}
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
    }
}

const style: StyleRulesCallback<Theme, ISendCryptoCurrencyDialogProps> = (theme: Theme) => {
    return {
        icon: {
            marginLeft: '.5rem',
            verticalAlign: 'middle',
        },
    };
};

export default withStyles(style)(SendCryptoCurrencyDialog);
