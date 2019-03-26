import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import types from './types';

export default makeExecutableSchema({
    resolvers,
    typeDefs: types,
});
