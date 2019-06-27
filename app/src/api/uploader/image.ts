import { StorageProviderManager } from 'network';

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

const createImageFileJson = (dataUrl: string) => {
    const result = JSON.stringify({
        dataUrl,
    });

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

}

const imageUploader = async (options: IImageUploadOptions): Promise<IImageUploadResult> => {
    const result: IImageUploadResult = {};

    console.log(options);

    return result;
};

export default imageUploader;
