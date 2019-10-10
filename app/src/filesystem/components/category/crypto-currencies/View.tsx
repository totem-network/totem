import Table from '@material-ui/core/Table';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Query } from "react-apollo";
import ActionButtons from '../../../containers/action-buttons/ActionButtons';
import RecieveDialog from '../../../containers/category/crypto-currencies/recieve/RecieveDialog';
import cryptoCurrenciesQuery from '../../../queries/cryptoCurrencies.graphql';
import ActionButton from '../../action-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import ViewNavButton from '../../view-nav/Button';
import ViewNav from '../../view-nav/ViewNav';
import AddTokenDialog from './AddTokenDialog';
import Head from './Head';
import Row from './Row';

export interface ICryptoCurrenciesViewProps {}

const useStyles = makeStyles({
    container: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        overflowY: 'auto',
    },
});

const CryptoCurrenciesView = ({}: ICryptoCurrenciesViewProps) => {
    const classes = useStyles();

    const [addTokenDialog, setAddTokenDialog] = useState(false);
    const [recieveDialog, setRecieveDialog] = useState(false);

    const openAddTokenDialog = () => {
        setAddTokenDialog(true);
    };

    const closeAddTokenDialog = () => {
        setAddTokenDialog(false);
    };

    const openRecieveDialog = () => {
        setRecieveDialog(true);
    };

    const closeRecieveDialog = () => {
        setRecieveDialog(false);
    };

    return (
        <>
            <ViewNav>
                <ViewNavButton
                    icon={<ArrowDropDownCircleIcon />}
                    label={'Recieve'}
                    onClick={openRecieveDialog}
                />
                <ViewNavButton
                    icon={<AccountBalanceWalletRoundedIcon />}
                    label={'Wallet'}
                />
                <ViewNavButton
                    icon={<SwapHorizontalCircleIcon />}
                    label={'Exchange'}
                />
            </ViewNav>
            <div className={classes.container}>
                <Query query={cryptoCurrenciesQuery}>
                    {({ loading, error, data, refetch }: any) => {
                        if (loading) {
                            return (
                                <LoadingBar />
                            );
                        }
                        if (error) {
                            const retry = () => {
                                refetch();
                                // TODO: refetch not reloading
                                // https://github.com/apollographql/react-apollo/issues/321
                            };

                            return (
                                <Error
                                    error={error}
                                    retry={retry}
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
            <ActionButtons>
                <ActionButton
                    onClick={openAddTokenDialog}
                >
                    Add token
                </ActionButton>
            </ActionButtons>
            <AddTokenDialog
                closeDialog={closeAddTokenDialog}
                open={addTokenDialog}
            />
            <RecieveDialog
                closeDialog={closeRecieveDialog}
                open={recieveDialog}
            />
        </>
    );
};

export default CryptoCurrenciesView;
