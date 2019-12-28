import { getImageSize, IImageSize } from 'filesystem/utils/images';
import Jimp from 'jimp';
import PrivateImageDatabase from './../../database/image/PrivateImageDatabase';

const getMimeTypeFromJimpImage = (jimpImage: any) => {
    if (jimpImage.hasAlpha()) {
        return Jimp.MIME_PNG;
    } else {
        return Jimp.MIME_JPEG;
    }
};

const resizeJimpImage = (jimpImage: any, size: IImageSize, maxSize: number) => {
    if (size.width > size.height) {
        if (size.width < maxSize) {
            return jimpImage;
        }

        jimpImage.resize(maxSize, Jimp.AUTO);
    } else {
        if (size.height < maxSize) {
            return jimpImage;
        }

        jimpImage.resize(Jimp.AUTO, maxSize);
    }

    return jimpImage;
};

export default {

    Mutation: {
        addImages: async (schema: any, {
            images,
        }: any) => {
            // TODO: show notification with loading bar while images are being processed (needs subscription)

            const database = await PrivateImageDatabase.create();

            const imageHashes = [];
            const imagesData = [];

            for (const image of images) {
                const jimpImage = await Jimp.read(image.dataUrl);
                const size = await getImageSize(image.dataUrl);

                if (!size) {
                    return {
                        images: [],
                        result: false,
                    };
                }

                const mimeType = getMimeTypeFromJimpImage(jimpImage);

                const lowResolutionPlaceholder = resizeJimpImage(
                    jimpImage.clone(),
                    size,
                    48,
                );

                const lowResolutionPlaceholderDataUrl = await lowResolutionPlaceholder.getBase64Async(mimeType);

                const thumbnail = resizeJimpImage(
                    jimpImage.clone(),
                    size,
                    180,
                );

                const thumbnailDataUrl = await thumbnail.getBase64Async(mimeType);

                const thumbnailRetina = resizeJimpImage(
                    jimpImage.clone(),
                    size,
                    360,
                );

                const thumbnailRetinaDataUrl = await thumbnailRetina.getBase64Async(mimeType);

                const thumbnail2x = resizeJimpImage(
                    jimpImage.clone(),
                    size,
                    360,
                );

                const thumbnail2xDataUrl = await thumbnail2x.getBase64Async(mimeType);

                const thumbnail2xRetina = resizeJimpImage(
                    jimpImage.clone(),
                    size,
                    720,
                );

                const thumbnail2xRetinaDataUrl = await thumbnail2xRetina.getBase64Async(mimeType);

                const uploadResult = await database.uploadImage({
                    fileDataUrl: image.dataUrl,
                    height: size.height,
                    lowResolutionPlaceholderDataUrl,
                    name: image.name,
                    thumbnail2xDataUrl,
                    thumbnail2xRetinaDataUrl,
                    thumbnailDataUrl,
                    thumbnailRetinaDataUrl,
                    type: 'pixel',
                    width: size.width,
                });

                if (!uploadResult.hash || !uploadResult.data) {
                    return {
                        images: [],
                        result: false,
                    };
                }

                imageHashes.push(uploadResult.hash);
                imagesData.push(uploadResult.data);
            }

            for (const imageHash of imageHashes) {
                await database.addImage(imageHash);
            }

            return {
                images: imagesData,
                result: true,
            };
        },
    },

    Query: {

        imageData: async (schema: any, {
            hash,
        }: any) => {
            const database = await PrivateImageDatabase.create();

            const file = await database.getImageFile(hash);

            return {
                file,
            };
        },

        images: async () => {
            const database = await PrivateImageDatabase.create();

            const imageEntries = await database.getImages();

            const imagePromises = imageEntries.map((imageEntry: any) => {
                return database.getImageMetaData(imageEntry.payload.value);
            });

            const images = await Promise.all(imagePromises);

            return images;
        },

    },

};
