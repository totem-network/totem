import FileType from 'file-type/browser';

export const getFileType = async (file: Blob | File): Promise<string> => {
    return new Promise((resolve: (value: string) => void) => {
        const reader = new FileReader();

        // TODO: is async function possible?
        reader.onloadend = async (event: any) => {
            if (!event.target) {
                return;
            }

            const type = await FileType.fromBuffer(event.target.result);

            if (!type) {
                return;
            }

            switch (type.mime) {
                // TODO: raw types: http://osp.wikidot.com/raw
                // TODO: svg
                case 'image/bmp':
                case 'image/flif':
                case 'image/gif':
                case 'image/jpeg':
                case 'image/png':
                case 'image/tiff':
                case 'image/vnd.adobe.photoshop':
                case 'image/vnd.ms-photo':
                case 'image/webp':
                case 'image/x-canon-cr2':
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
