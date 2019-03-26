import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { utils } from 'ethers';
import React, { Component, Fragment } from 'react';
import { Mutation } from "react-apollo";
import SendCryptoCurrencyForm from '../../../containers/views/crypto-currencies/SendCryptoCurrencyForm';
import sendCryptoCurrencyMutation from '../../../mutations/sendCryptoCurrency.graphql';

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
    submit: (form: string) => any;
}

export interface ISendCryptoCurrencyDialogState {}

type SendCryptoCurrencyDialogProps = ISendCryptoCurrencyDialogProps & WithStyles;

class SendCryptoCurrencyDialog extends Component<SendCryptoCurrencyDialogProps, ISendCryptoCurrencyDialogState> {

    constructor(props: SendCryptoCurrencyDialogProps, context?: any) {
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
        this.props.submit('sendCryptoCurrency');
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
                    {(sendCryptoCurrency) => {
                        const handleSubmit = (values: any) => {
                            let fee = gasPriceSafeLow;
                            if (values.get('fee')) {
                                fee = gasPriceFast;
                            }

                            const amount = utils.parseUnits(
                                values.get('amount'),
                                decimals,
                            ).toString();

                            sendCryptoCurrency({
                                variables: {
                                    amount,
                                    currencyOrToken,
                                    fee,
                                    to: values.get('to'),
                                },
                            });
                            closeDialog();
                        };

                        return (
                            <Fragment>
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
                                    <SendCryptoCurrencyForm
                                        onSubmit={handleSubmit}
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

export default withStyles(style)(SendCryptoCurrencyDialog);
