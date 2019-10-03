import { accountAddressSelector, boxes } from 'account';
import { getImageSize, IImageSize } from 'filesystem/utils/images';
import Jimp from 'jimp';
import { store } from 'state';
import DatabaseProviderManager from './../../database/ProviderManager';
import uploadImage from './../../uploader/image';

const getTotemSpace = async () => {
    const state = store.getState();
    const account = accountAddressSelector(state);

    const box = await boxes.openBox(account, (window as any).ethereum);

    const space = await box.openSpace('totem');

    return space;
};

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

                const uploadResult = await uploadImage({
                    fileDataUrl: image.dataUrl,
                    lowResolutionPlaceholderDataUrl,
                    name: image.name,
                    thumbnail2xDataUrl,
                    thumbnail2xRetinaDataUrl,
                    thumbnailDataUrl,
                    thumbnailRetinaDataUrl,
                    type: 'pixel',
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

            const space = await getTotemSpace();
            const orbitDbHash = await space.private.get('images');
            let database = null;

            if (!orbitDbHash) {
                database = await DatabaseProviderManager.createDatabase({
                    name: 'images',
                    // TODO: network and platform from state
                    network: '1',
                    platform: 'ipfs',
                    provider: 'orbit-db',
                    type: 'feed',
                });

                if (!database) {
                    return {
                        images: [],
                        result: false,
                    };
                }

                await space.private.set('images', database.id);
            } else {
                database = await DatabaseProviderManager.openDatabase({
                    // TODO: network and platform from state
                    network: '1',
                    path: orbitDbHash,
                    platform: 'ipfs',
                    provider: 'orbit-db',
                    type: 'feed',
                });

                // TODO: check if user is allowed to write to db

                if (!database) {
                    // TODO: if hash was outdated create new db

                    return {
                        images: [],
                        result: false,
                    };
                }
            }

            if (!database) {
                return {
                    images: [],
                    result: false,
                };
            }

            for (const imageHash of imageHashes) {
                await database.add(imageHash);
            }

            return {
                images: imagesData,
                result: true,
            };
        },
    },

    Query: {

        image: async (schema: any, {
            hash,
            size,
        }: any) => {
            // single image data
            const space = await getTotemSpace();
        },

        images: async () => {
            // Todo: query from orbit db and send metadata of all images
            const space = await getTotemSpace();

            /*const all = database.iterator({ limit: -1 })
                .collect()
                .map((e: any) => e.payload.value);

            console.log(all);*/
        },

    },

};
