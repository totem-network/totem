import { useApolloClient, useQuery } from '@apollo/react-hooks';
import Table from '@material-ui/core/Table';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import GET_CRYPTO_CURRENCIES from '../../../queries/getCryptoCurrencies.graphql';
import ActionButtons from '../../action-buttons/ActionButtons';
import ActionButton from '../../action-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import ViewNavButton from '../../view-nav/Button';
import ViewNav from '../../view-nav/ViewNav';
import AddTokenDialog from './AddTokenDialog';
import Head from './Head';
import RecieveDialog from './recieve/RecieveDialog';
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

    const apolloClient = useApolloClient();
    const { loading, error, data, refetch } = useQuery(GET_CRYPTO_CURRENCIES, {
        client: apolloClient,
    });

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

    const renderQuery = () => {
        if (loading || data === undefined) {
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
                {renderQuery()}
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
