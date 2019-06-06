import { getCurrentNetworkProvider } from '../../utils/blockchain';

export default {

    Mutation: {
        /*registerDomain: async (schema: any, {
            contract,
        }: any) => {

        },*/
    },

    Query: {
        resolveAddress: async (schema: any, {
            address,
        }: any) => {
            //
        },

        resolveDomain: async (schema: any, {
            domain,
        }: any) => {
            const result = {
                address: '',
                domain,
            };

            const provider = await getCurrentNetworkProvider();

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
