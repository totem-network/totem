import Ipfs from 'ipfs';
import ProviderManager from 'network/storage/ProviderManager';
import { expose } from 'comlink';
import { execute } from 'graphql';
import schema from '../schema';
import ProxyProvider from './ProxyProvider';
import ProxySigner from './ProxySigner';

expose({

    initialize: async () => {
        /*const node = yield call(Ipfs.create, {
            EXPERIMENTAL: { pubsub: true },
            repo: 'vinyai',
        });*/

        console.log('init worker');

        const node = Ipfs.create({
            EXPERIMENTAL: { pubsub: true },
            repo: 'vinyai',
        });

        await node.ready;

        ProviderManager.setProvider('ipfs', '1', node);

        console.log('worker finished');

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
