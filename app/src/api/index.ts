import { graphql } from 'graphql';
import schema from './schema';
import rootResolver from './schema/resolvers';
import types from './schema/types';

// TODO: sentry error tracking

const api = (query: string) => {
    return graphql(schema, query, rootResolver);
};

export {
    api,
    rootResolver,
    schema,
    types,
};
