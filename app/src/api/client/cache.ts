import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const createCache = async () => {
    // TODO: fragment matcher needed for unions and interfaces
    // see: https://github.com/apollographql/apollo-client/issues/3397
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: {
            __schema: {
                types: [],
            },
        },
    });

    const cache = new InMemoryCache({
        addTypename: true,
        fragmentMatcher,
    });

    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    /*await persistCache({
        cache,
        storage: window.localStorage,
    });*/

    return cache;
};

export default createCache;
