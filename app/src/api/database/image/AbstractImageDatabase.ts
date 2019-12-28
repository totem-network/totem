import BaseDatabase from '../BaseDatabase';

interface IImageJsonOptions {
    fileHash: string;
    height: number;
    lowResolutionPlaceholderHash?: string;
    name: string;
    thumbnail2xHash?: string;
    thumbnail2xRetinaHash?: string;
    thumbnailHash?: string;
    thumbnailRetinaHash?: string;
    type: 'vector' | 'pixel';
    width: number;
}

interface IImageUploadOptions {
    fileDataUrl: string;
    height: number;
    lowResolutionPlaceholderDataUrl?: string;
    name: string;
    thumbnail2xDataUrl?: string;
    thumbnail2xRetinaDataUrl?: string;
    thumbnailDataUrl?: string;
    thumbnailRetinaDataUrl?: string;
    type: 'vector' | 'pixel';
    width: number;
}

interface IImageUploadResult {
    hash?: string;
    data?: IImageJsonOptions;
}

abstract class AbstractImageDatabase extends BaseDatabase {

    public async uploadImage(options: IImageUploadOptions): Promise<IImageUploadResult> {
        if (!this.identity) {
            throw new Error('No identity set in database');
        }

        const result: IImageUploadResult = {};

        const files = [];

        if (options.fileDataUrl) {
            files.push({
                data: options.fileDataUrl,
                name: 'file',
            });
        }

        if (options.lowResolutionPlaceholderDataUrl) {
            files.push({
                data: options.lowResolutionPlaceholderDataUrl,
                name: 'lowResolutionPlaceholder',
            });
        }

        // TODO: has the same size as retina! -> only one file
        if (options.thumbnail2xDataUrl) {
            files.push({
                data: options.thumbnail2xDataUrl,
                name: 'thumbnail2x',
            });
        }

        if (options.thumbnail2xRetinaDataUrl) {
            files.push({
                data: options.thumbnail2xRetinaDataUrl,
                name: 'thumbnail2xRetina',
            });
        }

        if (options.thumbnailDataUrl) {
            files.push({
                data: options.thumbnailDataUrl,
                name: 'thumbnail',
            });
        }

        if (options.thumbnailRetinaDataUrl) {
            files.push({
                data: options.thumbnailRetinaDataUrl,
                name: 'thumbnailRetina',
            });
        }

        const encryptedFiles = this.identity.encrypt(files);

        // TODO: store storage provider in db entry:
        // with this setup it will be possible to store the files in multiple networks
        // but the orbit db must be stored in one network
        // const ipfs = await StorageProviderManager.getProvider('ipfs', '1');

        if (!this.database || !this.database._ipfs) {
            throw new Error('No database or ipfs');
        }

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
            fileHash: fileHashes.file,
            height: options.height,
            lowResolutionPlaceholderHash: fileHashes.lowResolutionPlaceholder,
            name: options.name,
            thumbnail2xHash: fileHashes.thumbnail2x,
            thumbnail2xRetinaHash: fileHashes.thumbnail2xRetina,
            thumbnailHash: fileHashes.thumbnail,
            thumbnailRetinaHash: fileHashes.thumbnailRetina,
            type: 'pixel',
            width: options.width,
        };

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

    public async getImageMetaData(hash: string) {
        if (!this.database || !this.database._ipfs) {
            throw new Error('No ipfs in database');
        }

        const ipfs = this.database._ipfs;

        const encryptedMetaData = await ipfs.cat(hash);

        if (!this.identity) {
            throw new Error('No identity set in database');
        }

        const metaData = JSON.parse(this.decrypt(encryptedMetaData, 'metaData')[0].data);

        return metaData;
    }

    public async getImageFile(hash: string) {
        if (!this.database || !this.database._ipfs) {
            return;
        }

        const ipfs = this.database._ipfs;

        const encryptedImageFile = await ipfs.cat(hash);

        if (!this.identity) {
            throw new Error('No identity set in database');
        }

        const imageFile = this.decrypt(encryptedImageFile, 'file')[0].data;

        return imageFile;
    }

    protected createImageJson(options: IImageJsonOptions) {
        const result = JSON.stringify(options);

        return result;
    }

    protected decrypt(data: any, name: string) {
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
