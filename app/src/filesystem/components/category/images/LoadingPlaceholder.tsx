import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
    animated,
    useSpring,
} from 'react-spring';

export interface IImageProps {
    height: number;
    width: number;
}

const useStyles = makeStyles({
    loading: {
        background: 'linear-gradient(to right, #eeeeee 8%, #e3e3e3 34%, #eeeeee 57%)',
    },
});

const Image = ({
    height,
    width,
}: IImageProps) => {
    const classes = useStyles();

    const imageStyle = {
        height,
        marginLeft: '10px',
        marginTop: '10px',
        width,
    };

    // TODO: crashes when resizing the browser, window or move the window
    // Maybe https://github.com/react-spring/react-spring/issues/741 helps
    const springProps = useSpring({
        from: {
            ...imageStyle,
            backgroundPosition: imageStyle.width * -1,
        },
        reset: true,
        to: async (next: any) => {
            while (1) {
                await next({
                    backgroundPosition: imageStyle.width,
                });
            }
        },
    });

    return (
        <animated.div
            className={classes.loading}
            style={springProps}
        />
    );
};

export default Image;
