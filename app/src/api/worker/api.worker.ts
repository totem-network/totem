import boxes from 'account/profile/boxes';
import { expose } from 'comlink';
import { execute } from 'graphql';
import schema from '../schema';
import ProxyProvider from './ProxyProvider';
import ProxySigner from './ProxySigner';

expose({

    initialize: async (proxyWeb3: any) => {
        const provider = new ProxyProvider(proxyWeb3);
        const signer = new ProxySigner(proxyWeb3, provider);

        const account = await signer.getAddress();

        await boxes.openBox(
            account,
            boxes.wrapEthersSigner(signer),
        );

        return true;
    },

    logout: async (proxyWeb3: any) => {
        const provider = new ProxyProvider(proxyWeb3);
        const signer = new ProxySigner(proxyWeb3, provider);

        const account = await signer.getAddress();

        const box = await boxes.openBox(
            account,
            boxes.wrapEthersSigner(signer),
        );

        await box.logout();

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
