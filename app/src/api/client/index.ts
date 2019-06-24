import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import schema from '../schema';
import rootResolver from '../schema/resolvers';
import createCache from './cache';

export const createApolloClient = async () => {
    const cache = await createCache();

    const apolloLink = ApolloLink.from(
        [
            new SchemaLink({
                rootValue: rootResolver,
                schema,
            }),
        ],
    );

    const apolloClient = new ApolloClient({
        cache,
        link: apolloLink,
    });

    return apolloClient;
};

let client: any = null;

export const getApolloClient = async () => {
    if (!client) {
        client = await createApolloClient();
    }

    return client;
};
