
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import { FormAction } from 'redux-form';
import cryptoCurrenciesQuery from '../../../queries/cryptoCurrencies.graphql';
import BottomButtons from '../../bottom-buttons/BottomButtons';
import BottomButton from '../../bottom-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import AddTokenDialog from './AddTokenDialog';
import Head from './Head';
import Row from './Row';

export interface ICryptoCurrenciesViewProps {
    addTokenSubmit: (form: string) => FormAction;
}

export interface ICryptoCurrenciesViewState {
    addTokenDialog: boolean;
}

type CryptoCurrenciesViewProps = ICryptoCurrenciesViewProps & WithStyles;

class CryptoCurrenciesView extends Component<CryptoCurrenciesViewProps, ICryptoCurrenciesViewState> {

    constructor(props: CryptoCurrenciesViewProps, context?: any) {
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
            addTokenDialog,
        } = this.state;

        const {
            container,
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
                                    <Error
                                        error={error}
                                    />
                                );
                            }

                            const rows = data.cryptoCurrencies.map((currency: any, index: number) => {
                                const currencyOrToken = currency.data.platform || currency.data.contract;

                                return (
                                    <Row
                                        key={index}
                                        balance={currency.balance}
                                        currencyOrToken={currencyOrToken}
                                        decimals={currency.decimals}
                                        name={currency.name}
                                        icon={currency.icon}
                                        price={currency.price}
                                        symbol={currency.symbol}
                                    />
                                );
                            });

                            return (
                                <Table>
                                    <Head />
                                    {rows}
                                </Table>
                            );
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
                <AddTokenDialog
                    addTokenSubmit={this.addToken}
                    closeDialog={this.closeAddTokenDialog}
                    open={addTokenDialog}
                />
            </Fragment>
        );
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
    };
};

export default withStyles(style)(CryptoCurrenciesView);
