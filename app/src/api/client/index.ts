import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import createIPFSUploadLink from '../links/IPFSUploadLink';
import schema from '../schema';
import rootResolver from '../schema/resolvers';

const IPFSUploadLink = createIPFSUploadLink({});

const apolloLink = ApolloLink.from(
    [
        IPFSUploadLink,
        new SchemaLink({
            rootValue: rootResolver,
            schema,
        }),
    ],
);

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: apolloLink,
});

export default apolloClient;
