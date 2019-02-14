import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { Query } from "react-apollo";
import cryptoCurrenciesQuery from '../../queries/cryptoCurrencies.graphql';
import Error from '../Error';
import LoadingBar from '../LoadingBar';

export interface ICryptoCurrenciesProps {}

export interface ICryptoCurrenciesState {}

type CryptoCurrenciesProps = ICryptoCurrenciesProps & WithStyles;

class CryptoCurrencies extends Component<CryptoCurrenciesProps, ICryptoCurrenciesState> {

    public render() {
        const {
            container,
            currencyContainer,
            icon,
        } = this.props.classes;

        return (
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
                                    <span>{currency.balance} </span>
                                    {currency.name}
                                </div>
                            );
                        });
                    }}
                </Query>
            </div>
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
