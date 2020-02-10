
export interface IImageSize {
    height: number;
    width: number;
}

// TODO: Be sure there is no malicious image url
export const getImageSize = async (image: string): Promise<IImageSize> => {
    return new Promise((resolve, reject) => {
        const imageObject = new Image();

        imageObject.onload = () => {
            resolve({
                height: imageObject.height,
                width: imageObject.width,
            });
        };

        imageObject.onerror = () => {
            reject();
        };

        imageObject.src = image;
    });
};
