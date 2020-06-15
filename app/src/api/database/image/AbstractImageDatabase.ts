import FileType from 'file-type/browser';
import Jimp from 'jimp';
import BaseDatabase from '../BaseDatabase';

interface IImageInput {
    dataUrl: string;
    name?: string;
    size?: number;
    mimeType?: string;
}

interface IImageSize {
    height: number;
    width: number;
}

interface IImageJsonOptions {
    hash48?: string;
    hash180?: string;
    hash360?: string;
    hash720?: string;
    hash1920?: string;
    hash3840?: string;
    hashSource: string;
    height: number;
    mimeType: string;
    name: string;
    type: 'vector' | 'pixel';
    width: number;
}

interface IImageUploadOptions {
    dataUrl48?: string;
    dataUrl180?: string;
    dataUrl360?: string;
    dataUrl720?: string;
    dataUrl1920?: string;
    dataUrl3840?: string;
    dataUrlSource: string;
    height: number;
    mimeType: string;
    name: string;
    type: 'vector' | 'pixel';
    width: number;
}

interface IImageUploadResult {
    hash?: string;
    data?: IImageJsonOptions;
}

interface IGetImagesOptions {
    after?: string;
    first?: number;
    requestedFields: string[];
}

abstract class AbstractImageDatabase extends BaseDatabase {

    // TODO: better solution as this is not the best in combination with TypeScript
    protected readonly SIZES = [
        48,
        180,
        360,
        720,
        1920,
        3840,
    ];

    /********************
     * Database Methods
     ********************/

    public async addImage(imageInput: IImageInput) {
        this.throwIfNotReady();

        const imageSize = await this.getImageSize(imageInput.dataUrl);
        const mimeType = await this.getMimeType(imageInput.dataUrl);
        const type = this.getImageType(mimeType);

        const resizedImages = await this.resizeImage(imageInput.dataUrl, imageSize, mimeType);

        const imageUploadOptions: IImageUploadOptions = {
            dataUrlSource: imageInput.dataUrl,
            height: imageSize.height,
            mimeType,
            name: imageInput.name || '',
            type,
            width: imageSize.width,
        };

        if (resizedImages['48']) {
            imageUploadOptions.dataUrl48 = resizedImages['48'];
        }

        if (resizedImages['180']) {
            imageUploadOptions.dataUrl180 = resizedImages['180'];
        }

        if (resizedImages['360']) {
            imageUploadOptions.dataUrl360 = resizedImages['360'];
        }

        if (resizedImages['720']) {
            imageUploadOptions.dataUrl720 = resizedImages['720'];
        }

        if (resizedImages['1920']) {
            imageUploadOptions.dataUrl1920 = resizedImages['1920'];
        }

        if (resizedImages['3840']) {
            imageUploadOptions.dataUrl3840 = resizedImages['3840'];
        }

        const uploadResult = await this.uploadImage(imageUploadOptions);

        const databaseResult = await this.database.add(uploadResult.hash);

        return {
            error: null,
            image: {
                files: {
                    fullscreen: imageUploadOptions.dataUrl1920,
                    fullscreen2x: imageUploadOptions.dataUrl3840,
                    lowResolutionPlaceholder: imageUploadOptions.dataUrl48,
                    source: imageUploadOptions.dataUrlSource,
                    thumbnail: imageUploadOptions.dataUrl180,
                    thumbnail2x: imageUploadOptions.dataUrl360,
                    thumbnailLarge: imageUploadOptions.dataUrl360,
                    thumbnailLarge2x: imageUploadOptions.dataUrl720,
                },
                metaData: {
                    height: imageUploadOptions.height,
                    name: imageUploadOptions.name,
                    type: imageUploadOptions.type,
                    width: imageUploadOptions.width,
                },
                ...this.formatPagination(),
            },
            result: true,
        };
    }

    public async addImages(imageInputs: IImageInput[]) {
        // TODO: show notification with loading bar while imagesData are being processed (needs subscription)

        // Adds all imagesData to the database and only stores the promises to run in parallel
        const addImageResults = [];
        for (const imageInput of imageInputs) {
            addImageResults.push(this.addImage(imageInput));
        }

        // TODO: add a resolve handler to notify client via graphql subscription about progress.

        // Now await to get the benefits of async functions
        await Promise.all(addImageResults);

        return addImageResults;
    }

    public async getImages({
        after,
        first,
        requestedFields,
    }: IGetImagesOptions) {
        this.throwIfNotReady();

        // TODO: use this.database.iterator() to get all imagesData, then sort via indexes

        // TODO: pagination for each image

        const imageEntries = this.database.iterator({ limit: -1 })
            .collect();

        if (!imageEntries) {
            return [];
        }

        const images = imageEntries.map((imageEntry: any) => {
            return this.getImageData(imageEntry.payload.value).then(async (imageData) => {
                const image: any = {
                    files: {},
                    metaData: {
                        height: imageData.height,
                        name: imageData.name,
                        type: imageData.type,
                        width: imageData.width,
                    },
                    ...this.formatPagination(),
                };

                if (requestedFields.includes('source')) {
                    image.files.source = this.getImageFile(imageData.hashSource);
                }

                if (
                    imageData.hash48 &&
                    requestedFields.includes('lowResolutionPlaceholder')
                ) {
                    image.files.lowResolutionPlaceholder = this.getImageFile(imageData.hash48);
                }

                if (
                    imageData.hash180 &&
                    requestedFields.includes('thumbnail')
                ) {
                    image.files.thumbnail = this.getImageFile(imageData.hash180);
                }

                if (
                    imageData.hash360 &&
                    (
                        requestedFields.includes('thumbnail2x') ||
                        requestedFields.includes('thumbnailLarge')
                    )
                ) {
                    image.files.thumbnail2x = this.getImageFile(imageData.hash360);
                    image.files.thumbnailLarge = image.files.thumbnail2x;
                }

                if (
                    imageData.hash720 &&
                    requestedFields.includes('thumbnailLarge2x')
                ) {
                    image.files.thumbnailLarge2x = this.getImageFile(imageData.hash720);
                }

                if (
                    imageData.hash1920 &&
                    requestedFields.includes('fullscreen')
                ) {
                    image.files.fullscreen = this.getImageFile(imageData.hash1920);
                }

                if (
                    imageData.hash3840 &&
                    requestedFields.includes('fullscreen2x')
                ) {
                    image.files.fullscreen2x = this.getImageFile(imageData.hash3840);
                }

                await this.awaitLoadingFiles(image.files);

                return image;
            });
        });

        await Promise.all(images);

        return images;
    }

    /********************
     * Image Helper
     ********************/

    protected async awaitLoadingFiles(files: any) {
        const promises: Promise<any>[] = [];

        for (const fileKey in files) {
            if (files[fileKey]) {
                promises.push(files[fileKey]);
            }
        }

        await Promise.all(promises);
    }

    protected async getImageData(hash: string): Promise<IImageJsonOptions> {
        this.throwIfNotReady();

        const ipfs = this.database._ipfs;

        const encryptedData = await ipfs.cat(hash);

        const data = JSON.parse(this.decrypt(encryptedData, 'data')[0].data);

        return data;
    }

    protected async getImageFile(hash: string) {
        this.throwIfNotReady();

        const ipfs = this.database._ipfs;

        const encryptedImageFile = await ipfs.cat(hash);

        const imageFile = this.decrypt(encryptedImageFile, 'file')[0].data;

        return imageFile;
    }

    protected async uploadImage(options: IImageUploadOptions): Promise<IImageUploadResult> {
        this.throwIfNotReady();

        const result: IImageUploadResult = {};

        const files = [];

        files.push({
            data: options.dataUrlSource,
            name: 'source',
        });

        if (options.dataUrl48) {
            files.push({
                data: options.dataUrl48,
                name: 'dataUrl48',
            });
        }

        if (options.dataUrl180) {
            files.push({
                data: options.dataUrl180,
                name: 'dataUrl180',
            });
        }

        if (options.dataUrl360) {
            files.push({
                data: options.dataUrl360,
                name: 'dataUrl360',
            });
        }

        if (options.dataUrl720) {
            files.push({
                data: options.dataUrl720,
                name: 'dataUrl720',
            });
        }

        if (options.dataUrl1920) {
            files.push({
                data: options.dataUrl1920,
                name: 'dataUrl1920',
            });
        }

        if (options.dataUrl3840) {
            files.push({
                data: options.dataUrl3840,
                name: 'dataUrl3840',
            });
        }

        const encryptedFiles = this.identity.encrypt(files);

        // TODO: store storage provider in db entry:
        // with this setup it will be possible to store the files in multiple networks
        // but the orbit db must be stored in one network
        // const ipfs = await StorageProviderManager.getProvider('ipfs', '1');

        const ipfs = this.database._ipfs;

        const fileHashes: any = {};
        for (const encryptedFile of encryptedFiles.files) {
            const fileBuffer = Buffer.from(
                JSON.stringify({
                    data: encryptedFile.data,
                    keys: encryptedFiles.keys,
                }),
            );

            // tslint:disable-next-line:no-shadowed-variable
            const [{ hash }] = await ipfs.add(fileBuffer);

            fileHashes[encryptedFile.name] = hash;
        }

        const imageJsonOptions: IImageJsonOptions = {
            hashSource: fileHashes.source,
            height: options.height,
            mimeType: options.mimeType,
            name: options.name,
            type: options.type,
            width: options.width,
        };

        if (fileHashes.dataUrl48) {
            imageJsonOptions.hash48 = fileHashes.dataUrl48;
        }

        if (fileHashes.dataUrl180) {
            imageJsonOptions.hash180 = fileHashes.dataUrl180;
        }

        if (fileHashes.dataUrl360) {
            imageJsonOptions.hash360 = fileHashes.dataUrl360;
        }

        if (fileHashes.dataUrl720) {
            imageJsonOptions.hash720 = fileHashes.dataUrl720;
        }

        if (fileHashes.dataUrl1920) {
            imageJsonOptions.hash1920 = fileHashes.dataUrl1920;
        }

        if (fileHashes.dataUrl3840) {
            imageJsonOptions.hash3840 = fileHashes.dataUrl3840;
        }

        const imageJson = this.createImageJson(imageJsonOptions);

        const encryptedImageJson = this.identity.encrypt([{
            data: imageJson,
            name: options.name,
        }], [], encryptedFiles.secretKey);

        const encryptedImageBuffer = Buffer.from(
            JSON.stringify({
                data: encryptedImageJson.files[0].data,
                keys: encryptedImageJson.keys,
            }),
        );

        const [{ hash }] = await ipfs.add(encryptedImageBuffer);

        result.hash = hash;
        result.data = imageJsonOptions;

        return result;
    }

    protected createImageJson(options: IImageJsonOptions) {
        const result = JSON.stringify(options);

        return result;
    }

    protected async getImageSize(image: string): Promise<IImageSize> {
        const jimpImage = await Jimp.read(image);

        return {
            height: jimpImage.bitmap.height,
            width: jimpImage.bitmap.width,
        };
    }

    protected async getMimeType(image: string): Promise<string> {
        // TODO: implement some checks if given mimeType is correct
        const type = await FileType.fromBuffer(Buffer.from(image));

        if (type) {
            return type.mime;
        }

        const jimpImage = await Jimp.read(image);

        return jimpImage.hasAlpha() ? Jimp.MIME_PNG : Jimp.MIME_JPEG;
    }

    protected getImageType(mimeType: string): 'pixel' | 'vector' {
        switch (mimeType) {
            // TODO: svg -> vector
            case 'image/gif':
            case 'image/jpeg':
            case 'image/png':
            case 'image/webp':
                return 'pixel';
            default:
                return 'pixel';
        }
    }

    protected resizeJimpImage(jimpImage: any, size: IImageSize, maxSize: number) {
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
    }

    protected async resizeImage(image: any, imageSize: IImageSize, mimeType: string) {
        const jimpImage = await Jimp.read(image);

        const resizedImages: any = {};

        for (const size of this.SIZES) {
            if (imageSize.width > imageSize.height) {
                if (imageSize.width < size) {
                    break;
                }
            } else {
                if (imageSize.height < size) {
                    break;
                }
            }

            const resizedJimpImage = this.resizeJimpImage(
                jimpImage.clone(),
                imageSize,
                size,
            );

            resizedImages[size.toString()] = await resizedJimpImage.getBase64Async(mimeType);
        }

        return resizedImages;
    }

    /********************
     * Encryption
     ********************/

    protected encrypt() {
        this.throwIfNotReady();
        // TODO
    }

    // TODO: allow multiple files decryption with same key
    protected decrypt(data: any, name: string) {
        this.throwIfNotReady();

        const dataJson = JSON.parse(Buffer.from(data).toString());

        return this.identity.decrypt({
            files: [{
                data: dataJson.data,
                name,
            }],
            keys: dataJson.keys,
        });
    }

}

export default AbstractImageDatabase;
