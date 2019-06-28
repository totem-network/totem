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
