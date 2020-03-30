import { getImageSize, IImageSize } from 'filesystem/utils/images';
import PrivateImageDatabase from './../../database/image/PrivateImageDatabase';

export default {

    Mutation: {
        addImage: async (schema: any, {
            image,
        }: any) => {
            const database = await PrivateImageDatabase.create();

            return database.addImage(image);
        },

        addImages: async (schema: any, {
            images,
        }: any) => {
            const database = await PrivateImageDatabase.create();

            return database.addImages(images);
        },
    },

    Query: {

        image: async (schema: any, {
            hash,
        }: any) => {
            // TODO
        },

        images: async (schema: any, {
            after,
            first,
        }: any) => {
            const database = await PrivateImageDatabase.create();

            const images = await database.getImages({
                after,
                first,
            });

            return images;
        },

    },

};
