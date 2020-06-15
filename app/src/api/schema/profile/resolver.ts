import IdentityManager from 'account/identity/IdentityManager';
import StorageProviderManager from 'network/storage/ProviderManager';

export default {

    Mutation: {

        createProfile: async (
            schema: any,
            {
                name,
            }: any,
            context: any,
        ) => {
            const result = {
                profile: null,
                result: false,
            };

            const ipfs = await StorageProviderManager.getProvider('ipfs', '1');

            const identityManager = new IdentityManager(ipfs, context.signer, context.provider);

            const identityResult = await identityManager.createIdentity({
                name,
            });

            if (!identityResult) {
                return result;
            }

            // TODO: event listener for transaction, to show user it has gone through

            const profile = await identityManager.loadProfile(identityResult.identity);

            if (!profile) {
                return result;
            }

            result.result = true;

            // TODO: profile to graphql result

            return result;
        },

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
                identity: null,
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

            const ipfs = await StorageProviderManager.getProvider('ipfs', '1');

            const identityManager = new IdentityManager(ipfs, context.signer, context.provider);

            const profile = await identityManager.loadPublicProfile(address);

            if (!profile) {
                return result;
            }

            const did = profile.getDid();

            if (profile.get('name')) {
                result.name = profile.get('name');
            }

            if (profile.get('image')) {
                result.image = profile.get('image');
            }

            return result;
        },
    },

};
