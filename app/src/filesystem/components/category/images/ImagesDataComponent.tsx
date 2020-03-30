import justifiedLayout from 'justified-layout';
import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';

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
            height: image.metaData.height,
            width: image.metaData.width,
        };
    });

    const layout = justifiedLayout(imageSizes, {
        containerWidth: width,
        targetRowHeight: 160,
    });

    return data.images.map((image: any, index: number) => {
        // TODO: right thumbnail size for display dpi

        return (
            <ImagePlaceholder
                height={layout.boxes[index].height}
                image={image.files.lowResolutionPlaceholder}
                key={index}
                width={layout.boxes[index].width}
            />
        );
    });
};

export default ImagesDataComponent;
