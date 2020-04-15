import PrivateImageDatabase from './../../database/image/PrivateImageDatabase';

export default {

    Mutation: {
        addImage: async (
            schema: any,
            {
                image,
            }: any,
            context: any,
        ) => {
            const database = await PrivateImageDatabase.create(
                context.blockchainNetwork,
                context.signer,
                context.provider,
            );

            return database.addImage(image);
        },

        addImages: async (
            schema: any,
            {
                images,
            }: any,
            context: any,
        ) => {
            const database = await PrivateImageDatabase.create(
                context.blockchainNetwork,
                context.signer,
                context.provider,
            );

            return database.addImages(images);
        },
    },

    Query: {

        image: async (
            schema: any,
            {
                hash,
            }: any,
            context: any,
        ) => {
            // TODO
        },

        images: async (
            schema: any,
            {
                after,
                first,
            }: any,
            context: any,
        ) => {
            const database = await PrivateImageDatabase.create(
                context.blockchainNetwork,
                context.signer,
                context.provider,
            );

            const images = await database.getImages({
                after,
                first,
            });

            return images;
        },

    },

};
