import PrivateImageDatabase from '../../database/image/PrivateImageDatabase';
import operationFieldsSelector from '../../utils/operationFieldsSelector';

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
            info: any,
        ) => {
            const requestedFields = operationFieldsSelector(info.operation, 'images:files');

            const database = await PrivateImageDatabase.create(
                context.blockchainNetwork,
                context.signer,
                context.provider,
            );

            const images = await database.getImages({
                after,
                first,
                requestedFields,
            });

            return images;
        },

    },

};
