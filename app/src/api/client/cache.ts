import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const createCache = async () => {
    const cache = new InMemoryCache();

    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    await persistCache({
        cache,
        storage: window.localStorage,
    });

    return cache;
};

export default createCache;
