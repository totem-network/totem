//import { graphql } from 'graphql';
import { createApolloClient, getApolloClient } from './client';
/*import schema from './schema';
import rootResolver from './schema/resolvers';
import types from './schema/types';*/

// TODO: sentry error tracking

/*const api = (query: string) => {
    return graphql(schema, query, rootResolver);
};*/

export {
    // api,
    createApolloClient,
    getApolloClient,
    /*rootResolver,
    schema,
    types,*/
};
