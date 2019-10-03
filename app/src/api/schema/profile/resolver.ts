import { boxes } from 'account';
import { getCurrentNetworkProvider } from 'utils/blockchain';

export default {

    Mutation: {
        /*updateProfile: async (schema: any, {
            contract,
        }: any) => {
            //
        },*/
    },

    Query: {
        getProfile: async (schema: any, {
            address,
            domain,
        }: any) => {
            const result = {
                address,
                header: '',
                image: '',
                name: '',
            };

            const provider = await getCurrentNetworkProvider();

            if (!provider) {
                return result;
            }

            if (
                domain &&
                domain.endsWith('.eth')
            ) {
                address = await provider.resolveName(domain);
                result.address = address;
            }

            const boxImport = await import(/* webpackChunkName: '3box' */ '3box');

            const Box = boxImport.default;

            const profile = await Box.getProfile(address);

            if (profile.name) {
                result.name = profile.name;
            }

            if (
                profile.image &&
                profile.image.length > 0 &&
                profile.image[0].contentUrl &&
                profile.image[0].contentUrl['/']
            ) {
                result.image = profile.image[0].contentUrl['/'];
            }

            return result;
        },
    },

};
