// import { boxes } from 'account';
import Box from '3box';
import BlockchainProviderManager from 'network/blockchain/ProviderManager';

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
        getProfile: async (
            schema: any,
            {
                address,
                domain,
            }: any,
            context: any,
        ) => {
            const result = {
                address,
                header: '',
                image: '',
                name: '',
            };

            if (
                domain &&
                domain.endsWith('.eth')
            ) {
                address = await context.provider.resolveName(domain);
                result.address = address;
            }

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
