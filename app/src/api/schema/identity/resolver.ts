import IdentityManager from 'account/identity/IdentityManager';
import StorageProviderManager from 'network/storage/ProviderManager';

export default {

    Mutation: {
        /*updateProfile: async (
            schema: any,
            {
                address,
                domain,
            }: any,
            context: any,
        ) => {
            //
        },*/
    },

    Query: {
        getIdentity: async (
            schema: any,
            {
                address,
                domain,
            }: any,
            context: any,
        ) => {
            const result = {};

            if (
                domain &&
                domain.endsWith('.eth')
            ) {
                address = await context.provider.resolveName(domain);
            }

            const ipfs = await StorageProviderManager.getProvider('ipfs', '1');

            const identityManager = new IdentityManager(ipfs, context.signer, context.provider);

            // const identity = await identityManager.loadIdentity(address);

            return result;
        },
    },

};
