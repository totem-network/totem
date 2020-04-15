import justifiedLayout from 'justified-layout';
import React, { useEffect, useState } from 'react';
import Image from './Image';
import ImagePlaceholder from './ImagePlaceholder';

export interface IImagesDataComponentProps {
    data: any;
    width: number;
}

const calculateLayout = (data: any, width: number) => {
    const imageSizes = data.images.map((image: any, index: number) => {
        return {
            height: image.metaData.height,
            width: image.metaData.width,
        };
    });

    return justifiedLayout(imageSizes, {
        containerWidth: width,
        targetRowHeight: 160,
    });
};

const ImagesDataComponent = ({
    data,
    width,
}: IImagesDataComponentProps) => {
    const [layout, setLayout] = useState(calculateLayout(data, width));

    // TODO: maybe useLayoutEffect
    useEffect(
        () => {
            setLayout(calculateLayout(data, width));
        },
        [data, width],
    );

    return data.images.map((image: any, index: number) => {
        // TODO: right thumbnail size for display dpi, must be done in view component (different queries!)

        return (
            <Image
                height={layout.boxes[index].height}
                image={image.files.thumbnail2x}
                key={index}
                width={layout.boxes[index].width}
            />
        );
    });
};

export default ImagesDataComponent;
