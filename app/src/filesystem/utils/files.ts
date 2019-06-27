import fileType from 'file-type';

export const getFileType = async (file: Blob | File): Promise<string> => {
    return new Promise((resolve: (value: string) => void) => {
        const reader = new FileReader();

        reader.onloadend = (event: any) => {
            if (!event.target) {
                return;
            }

            const type = fileType(event.target.result);

            if (!type) {
                return;
            }

            switch (type.mime) {
                // TODO: svg
                case 'image/bmp':
                case 'image/flif':
                case 'image/gif':
                case 'image/jpeg':
                case 'image/jxr':
                case 'image/png':
                case 'image/tiff':
                case 'image/tiff-fx':
                case 'image/vnd.adobe.photoshop':
                case 'image/vnd.ms-photo':
                case 'image/webp':
                case 'image/x-bmp':
                case 'image/x-canon-cr2':
                case 'image/x-dcraw':
                case 'image/x-icon':
                    resolve('image');
                    break;
                case 'application/pdf':
                    resolve('document');
                    break;
            }
        };

        reader.readAsArrayBuffer(file);
    });
};

export const blobToDataUrl = async (blobOrFile: Blob | File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            if (!event || !event.target || !(event.target as any).result) {
                reject();
                return;
            }

            resolve((event.target as any).result);
        };

        fileReader.readAsDataURL(blobOrFile);
    });
};

export const dataUrlToBlob = (dataUrl: string): Blob => {
    const parts = dataUrl.split(',');

    if (!parts || !parts[0] || !parts[1]) {
        throw new Error('Data URL invalid');
    }

    const mimeParts = parts[0].match(/:(.*?);/);

    if (!mimeParts) {
        throw new Error('Data URL invalid');
    }

    const mimeType = mimeParts[1];
    const blobString = atob(parts[1]);
    const blobU8Array = new Uint8Array(blobString.length);

    for (let i = 0; i < blobString.length; i++) {
        blobU8Array[i] = blobString.charCodeAt(i);
    }

    return new Blob([blobU8Array], {
        type: mimeType,
    });
};

export const mimeTypeFromDataUrl = (dataUrl: string): string => {
    const parts = dataUrl.split(',');

    if (!parts || !parts[0]) {
        throw new Error('Data URL invalid');
    }

    const mimeParts = parts[0].match(/:(.*?);/);

    if (!mimeParts || !mimeParts[1]) {
        throw new Error('Data URL invalid');
    }

    const mimeType = mimeParts[1];

    return mimeType;
};
