import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface IImageProps {
    height: number;
    image: string;
    width: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        bottomBar: {
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        container: {
            borderRadius: theme.shape.borderRadius,
            cursor: 'pointer',
            marginLeft: '10px',
            marginTop: '10px',
            overflow: 'hidden',
        },
        image: {
            //
        },
        topBar: {
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
    };
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
        <div
            className={classes.container}
        >
            <img
                className={classes.image}
                style={imageStyle}
                src={image}
            />
        </div>
    );
};

export default Image;
