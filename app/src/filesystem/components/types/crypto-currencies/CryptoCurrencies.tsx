
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, Fragment } from 'react';
import { Mutation, Query } from "react-apollo";
import { FormAction } from 'redux-form';
import AddTokenForm from '../../../containers/types/crypto-currencies/AddTokenForm';
import addTokenMutation from '../../../mutations/addToken.graphql';
import cryptoCurrenciesQuery from '../../../queries/cryptoCurrencies.graphql';
import BottomButtons from '../../bottom-buttons/BottomButtons';
import BottomButton from '../../bottom-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';

export interface ICryptoCurrenciesProps {
    addTokenSubmit: (form: string) => FormAction;
}

export interface ICryptoCurrenciesState {
    addTokenDialog: boolean;
}

type CryptoCurrenciesProps = ICryptoCurrenciesProps & WithStyles;

class CryptoCurrencies extends Component<CryptoCurrenciesProps, ICryptoCurrenciesState> {

    constructor(props: CryptoCurrenciesProps, context?: any) {
        super(props, context);

        this.addToken = this.addToken.bind(this);
        this.openAddTokenDialog = this.openAddTokenDialog.bind(this);
        this.closeAddTokenDialog = this.closeAddTokenDialog.bind(this);

        this.state = {
            addTokenDialog: false,
        };
    }

    public addToken() {
        const { addTokenSubmit } = this.props;

        addTokenSubmit('addToken');
    }

    public openAddTokenDialog() {
        this.setState({
            ...this.state,
            addTokenDialog: true,
        });
    }

    public closeAddTokenDialog() {
        this.setState({
            ...this.state,
            addTokenDialog: false,
        });
    }

    public render() {
        const {
            container,
            currencyContainer,
            icon,
        } = this.props.classes;

        return (
            <Fragment>
                <div className={container}>
                    <Query query={cryptoCurrenciesQuery}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return (
                                    <LoadingBar />
                                );
                            }
                            if (error) {
                                return (
                                    <Error />
                                );
                            }

                            return data.cryptoCurrencies.map((currency: any, index: number) => {
                                return (
                                    <div key={index} className={currencyContainer}>
                                        <object data={currency.icon} className={icon}>
                                            <img src='/images/cryptocurrency-icons/generic.svg' className={icon} />
                                        </object>
                                        <span>{this.formatCurrency(currency.balance)} </span>
                                        {currency.name}
                                    </div>
                                );
                            });
                        }}
                    </Query>
                </div>
                <BottomButtons>
                    <BottomButton
                        onClick={this.openAddTokenDialog}
                    >
                        Add token
                    </BottomButton>
                </BottomButtons>
                {this.renderAddTokenDialog()}
            </Fragment>
        );
    }

    protected renderAddTokenDialog() {
        return (
            <Dialog
                open={this.state.addTokenDialog}
                onClose={this.closeAddTokenDialog}
                aria-labelledby="form-dialog-title"
            >
                <Mutation mutation={addTokenMutation}>
                    {(addToken) => {
                        const handleSubmit = (values: any) => {
                            addToken({
                                variables: {
                                    contract: values.get('contract'),
                                },
                            });
                            this.closeAddTokenDialog();
                        };

                        return (
                            <Fragment>
                                <DialogTitle>
                                    Add token
                                </DialogTitle>
                                <DialogContent>
                                    <AddTokenForm
                                        onSubmit={handleSubmit}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={this.closeAddTokenDialog}
                                    >
                                        Cancel
                                    </Button>
                                        <Button onClick={this.addToken}>
                                            Add Token
                                        </Button>
                                </DialogActions>
                            </Fragment>
                        );
                    }}
                </Mutation>
            </Dialog>
        );
    }

    protected formatCurrency(balance: string) {
        const splitBalance = balance.split('.');

        if (splitBalance.length === 1) {
            return balance;
        }

        return `${splitBalance[0]}.${splitBalance[1].slice(0, 4)}`;
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            alignContent: 'flex-start',
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%',
            overflowY: 'auto',
        },
        currencyContainer: {
            margin: '0 20px 20px 20px',
            textAlign: 'center',
            width: '120px',
        },
        icon: {
            display: 'block',
            height: '32px',
            margin: '.2rem auto',
            width: '32px',
        },
    };
};

export default withStyles(style)(CryptoCurrencies);
