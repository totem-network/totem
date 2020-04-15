import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core/styles';
import { getApolloClient } from 'api/client';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { theme } from 'themes';
import IntlProvider from './app/components/Intl';
import Layout from './app/components/Layout';

interface IAppProps {}

const App = ({}: IAppProps) => {
    const [apolloClient, setApolloClient] = useState<any>(null);

    useEffect(() => {
        const initializeApp = async () => {
            const client = await getApolloClient();

            setApolloClient(client);
        };

        initializeApp();
    });

    if (!apolloClient) {
        return (
            <div>
                ...Loading
            </div>
        );
    }

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <IntlProvider>
                    <Layout />
                </IntlProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
};

let exportedApp = App;
if (process.env.NODE !== 'production' && module.hot) {
    exportedApp = hot(module)(App);
}

export default exportedApp;
