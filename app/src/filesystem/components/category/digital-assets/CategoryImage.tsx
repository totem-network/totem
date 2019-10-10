import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface ICategoryImageProps {
    images: string[];
}

const useStyles = makeStyles({
    image: {
        backgroundPositionX: 'center',
        backgroundSize: 'cover',
        borderRadius: '.25rem 1rem .25rem',
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
        height: '64px',
        margin: '.2rem auto',
        width: '64px',
    },
});

const CategoryImage = ({
    images,
}: ICategoryImageProps) => {
    const classes = useStyles();

    if (images.length === 1) {
        const imageStyle = {
            backgroundImage: `url(${images[0]})`,
        };

        return (
            <div className={classes.image} style={imageStyle} />
        );
    }

    // TODO: show split view for up to 4 images

    if (images.length >= 1) {
        const imageStyle = {
            backgroundImage: `url(${images[0]})`,
        };

        return (
            <div className={classes.image} style={imageStyle} />
        );
    }

    return (
        <img />
    );
};

export default CategoryImage;
