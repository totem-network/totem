import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface IImagePlaceholderProps {
    height: number;
    image: string;
    width: number;
}

const useStyles = makeStyles({
    container: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        overflowY: 'auto',
    },
    placeholder: {
        filter: 'blur(3px)',
    },
});

const ImagePlaceholder = ({
    height,
    image,
    width,
}: IImagePlaceholderProps) => {
    const classes = useStyles();

    const imageStyle = {
        height,
        marginLeft: '10px',
        marginTop: '10px',
        width,
    };

    return (
        <img
            className={classes.placeholder}
            style={imageStyle}
            src={image}
        />
    );
};

export default ImagePlaceholder;
