
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import RecieveDialog from '../../../containers/views/crypto-currencies/recieve/RecieveDialog';
import cryptoCurrenciesQuery from '../../../queries/cryptoCurrencies.graphql';
import BottomButtons from '../../bottom-buttons/BottomButtons';
import BottomButton from '../../bottom-buttons/Button';
import Error from '../../Error';
import HeaderButton from '../../header/Button';
import Header from '../../header/Header';
import LoadingBar from '../../LoadingBar';
import AddTokenDialog from './AddTokenDialog';
import Head from './Head';
import Row from './Row';

export interface ICryptoCurrenciesViewProps {}

export interface ICryptoCurrenciesViewState {
    addTokenDialog: boolean;
    recieveDialog: boolean;
}

type CryptoCurrenciesViewProps = ICryptoCurrenciesViewProps & WithStyles;

class CryptoCurrenciesView extends Component<CryptoCurrenciesViewProps, ICryptoCurrenciesViewState> {

    constructor(props: CryptoCurrenciesViewProps, context?: any) {
        super(props, context);

        this.openAddTokenDialog = this.openAddTokenDialog.bind(this);
        this.closeAddTokenDialog = this.closeAddTokenDialog.bind(this);
        this.openRecieveDialog = this.openRecieveDialog.bind(this);
        this.closeRecieveDialog = this.closeRecieveDialog.bind(this);

        this.state = {
            addTokenDialog: false,
            recieveDialog: false,
        };
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

    public openRecieveDialog() {
        this.setState({
            ...this.state,
            recieveDialog: true,
        });
    }

    public closeRecieveDialog() {
        this.setState({
            ...this.state,
            recieveDialog: false,
        });
    }

    public render() {
        const {
            addTokenDialog,
            recieveDialog,
        } = this.state;

        const {
            container,
        } = this.props.classes;

        return (
            <Fragment>
                <Header>
                    <HeaderButton>
                        Exchange
                    </HeaderButton>
                    <HeaderButton onClick={this.openRecieveDialog}>
                        Recieve
                    </HeaderButton>
                </Header>
                <div className={container}>
                    <Query query={cryptoCurrenciesQuery}>
                        {({ loading, error, data }: any) => {
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
                    closeDialog={this.closeAddTokenDialog}
                    open={addTokenDialog}
                />
                <RecieveDialog
                    closeDialog={this.closeRecieveDialog}
                    open={recieveDialog}
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
