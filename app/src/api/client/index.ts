import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
// import { SchemaLink } from 'apollo-link-schema';
import { api } from 'worker';
import WorkerLink from '../links/WorkerLink';
// import schema from '../schema';
// import rootResolver from '../schema/resolvers';
import createCache from './cache';

export const createApolloClient = async () => {
    const cache = await createCache();

    const apolloLink = ApolloLink.from(
        [
            // TODO: queries are fetched in a blocking order, but this should be possible
            // Query A send
            // Query B send
            // Query B resolved
            // Query A resolved
            // Maybe webworker fixes this

            /*new SchemaLink({
                rootValue: rootResolver,
                schema,
            }),*/

            new WorkerLink(api),
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
