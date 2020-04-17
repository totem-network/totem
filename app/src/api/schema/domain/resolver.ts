import BlockchainProviderManager from 'network/blockchain/ProviderManager';

export default {

    Mutation: {
        /*registerDomain: async (schema: any, {
            contract,
        }: any) => {

        },*/
    },

    Query: {
        resolveAddress: async (
            schema: any,
            {
                address,
            }: any,
            context: any,
        ) => {
            //
        },

        resolveDomain: async (
            schema: any,
            {
                domain,
            }: any,
            context: any,
        ) => {
            const result = {
                address: '',
                domain,
            };

            const provider = await BlockchainProviderManager.getProvider(
                context.blockchainNetwork.chainId,
            );

            if (!provider) {
                return result;
            }

            const address = await provider.resolveName(domain);

            if (!address) {
                return result;
            }

            result.address = address;

            return result;
        },
    },

};
