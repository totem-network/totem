import { ThemeProvider } from '@material-ui/core/styles';
import { getApolloClient } from 'api';
import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { theme } from 'themes';
import Layout from './app/components/Layout';
import IntlProvider from './app/containers/Intl';

interface IAppProps {}

const App = (props: IAppProps) => {
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
