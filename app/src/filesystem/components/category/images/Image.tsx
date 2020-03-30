import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface IImageProps {
    height: number;
    image: string;
    width: number;
}

const useStyles = makeStyles({
    image: {
        marginLeft: '10px',
        marginTop: '10px',
    }
});

const Image = ({
    height,
    image,
    width,
}: IImageProps) => {
    const classes = useStyles();

    const imageStyle = {
        height,
        width,
    };

    return (
        <img
            className={classes.image}
            style={imageStyle}
            src={image}
        />
    );
};

export default Image;
