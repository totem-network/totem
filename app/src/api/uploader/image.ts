import StorageProviderManager from 'network/storage/ProviderManager';

interface IImageJsonOptions {
    fileHash: string;
    lowResolutionPlaceholderHash?: string;
    name: string;
    thumbnail2xHash?: string;
    thumbnail2xRetinaHash?: string;
    thumbnailHash?: string;
    thumbnailRetinaHash?: string;
    type: 'vector' | 'pixel';
}

const createImageJson = (options: IImageJsonOptions) => {
    const result = JSON.stringify(options);

    return result;
};

interface IImageUploadOptions {
    fileDataUrl: string;
    lowResolutionPlaceholderDataUrl?: string;
    name: string;
    thumbnail2xDataUrl?: string;
    thumbnail2xRetinaDataUrl?: string;
    thumbnailDataUrl?: string;
    thumbnailRetinaDataUrl?: string;
    type: 'vector' | 'pixel';
}

interface IImageUploadResult {
    hash?: string;
    data?: IImageJsonOptions;
}

const imageUploader = async (options: IImageUploadOptions, identity: any): Promise<IImageUploadResult> => {
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

    const encryptedFiles = identity.encryptFiles(files);

    // TODO: get storage provider network from state
    const ipfsNode = await StorageProviderManager.getProvider('ipfs', '1');

    const fileHashes: any = {};
    for (const encryptedFile of encryptedFiles.files) {
        const fileBuffer = Buffer.from(encryptedFile.data);

        // tslint:disable-next-line:no-shadowed-variable
        const [{ hash }] = await ipfsNode.add(fileBuffer);

        fileHashes[encryptedFile.name] = hash;
    }

    const imageJsonOptions: IImageJsonOptions = {
        fileHash: fileHashes.file,
        lowResolutionPlaceholderHash: fileHashes.lowResolutionPlaceholder,
        name: options.name,
        thumbnail2xHash: fileHashes.thumbnail2x,
        thumbnail2xRetinaHash: fileHashes.thumbnail2xRetina,
        thumbnailHash: fileHashes.thumbnail,
        thumbnailRetinaHash: fileHashes.thumbnailRetina,
        type: 'pixel',
    };

    const imageJson = createImageJson(imageJsonOptions);

    const encryptedImageJson = identity.encryptFiles([{
        data: imageJson,
        name: options.name,
    }], [], encryptedFiles.secretKey);

    const encryptedImageBuffer = Buffer.from(
        JSON.stringify({
            data: encryptedImageJson.file.data,
            keys: encryptedImageJson.keys,
        }),
    );

    const [{ hash }] = await ipfsNode.add(encryptedImageBuffer);

    // TODO: ipns? or store hashes (version controll if old files are paid for)

    result.hash = hash;
    result.data = imageJsonOptions;

    return result;
};

export default imageUploader;
