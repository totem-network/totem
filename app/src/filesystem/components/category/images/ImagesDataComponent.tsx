import justifiedLayout from 'justified-layout';
import React from 'react';
import Image from './Image';

export interface IImagesDataComponentProps {
    data: any;
    width: number;
}

const ImagesDataComponent = ({
    data,
    width,
}: IImagesDataComponentProps) => {
    const imageSizes = data.images.map((image: any, index: number) => {
        return {
            height: image.height,
            width: image.width,
        };
    });

    const layout = justifiedLayout(imageSizes, {
        containerWidth: width,
        targetRowHeight: 160,
    });

    console.log(layout);

    return data.images.map((image: any, index: number) => {
        // TODO: right thumbnail size for display dpi

        return (
            <Image
                height={layout.boxes[index].height}
                imageHash={image.thumbnailHash}
                key={index}
                placeholderHash={image.lowResolutionPlaceholderHash}
                width={layout.boxes[index].width}
            />
        );
    });
};

export default ImagesDataComponent;
