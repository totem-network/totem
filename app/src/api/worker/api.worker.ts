import {
    getResolver,
    setBlockchainProvider,
    setStorageProvider,
} from 'account/identity/resolver';
import { Resolver } from 'did-resolver';
import Ipfs from 'ipfs';
import ProviderManager from 'network/storage/ProviderManager';
import { expose } from 'comlink';
import { execute } from 'graphql';
import schema from '../schema';
import ProxyProvider from './ProxyProvider';
import ProxySigner from './ProxySigner';
import IdentityProvider from '../database/IdentityProvider';

expose({

    initialize: async (proxyWeb3: any) => {
        const provider = new ProxyProvider(proxyWeb3);
        setBlockchainProvider(provider);

        const ipfs = await Ipfs.create({
            EXPERIMENTAL: {
                pubsub: true,
            },
            repo: 'vinyai',
        });

        ProviderManager.setProvider('ipfs', '1', ipfs);
        setStorageProvider(ipfs);

        const didResolver = new Resolver({
            vinyai: getResolver(),
        });
        IdentityProvider.setResolver(didResolver);

        return true;
    },

    login: async (proxyWeb3: any) => {
        const provider = new ProxyProvider(proxyWeb3);
        const signer = new ProxySigner(proxyWeb3, provider);

        const account = await signer.getAddress();
        
        // TODO: sign message to get private key and load profile

        return true;
    },

    logout: async (proxyWeb3: any) => {
        const provider = new ProxyProvider(proxyWeb3);
        const signer = new ProxySigner(proxyWeb3, provider);

        const account = await signer.getAddress();

        // TODO: clear any left data

        return true;
    },

    request: (operation: any, proxyWeb3: any) => {
        const provider = new ProxyProvider(proxyWeb3);
        const signer = new ProxySigner(proxyWeb3, provider);

        return execute(
            schema,
            operation.query,
            {},
            {
                ...operation.context,
                provider,
                signer,
            },
            operation.variables,
            operation.operationName,
        );
    },

});
