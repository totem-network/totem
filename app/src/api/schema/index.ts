import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import types from './types';

export default makeExecutableSchema({
    // TODO: logger: { log: (e) => console.log(e) },
    resolvers,
    typeDefs: types,
});
