import { makeStyles } from '@material-ui/styles';
import React, { useCallback } from 'react';
import {
    animated,
    useSpring,
} from 'react-spring';

export interface ILoadingPlaceholderProps {
    height: number;
    width: number;
}

const useStyles = makeStyles({
    loading: {
        background: 'linear-gradient(to right, #eeeeee 8%, #e3e3e3 34%, #eeeeee 57%)',
    },
});

const LoadingPlaceholder = ({
    height,
    width,
}: ILoadingPlaceholderProps) => {
    const classes = useStyles();

    const imageStyle = {
        height,
        marginLeft: '10px',
        marginTop: '10px',
        width,
    };

    // TODO: crashes when resizing the browser, window or move the window
    // Maybe https://github.com/react-spring/react-spring/issues/741 helps
    // With useCallback it crashes after state change when moving window
    // maybe useReducer to query to redux store and pack it into useCallback
    const springProps = useSpring({
        from: {
            ...imageStyle,
            backgroundPosition: width * -1,
        },
        reset: true,
        /*to: useCallback(
            async (next) => {
                while (1) {
                    await next({
                        backgroundPosition: width,
                    });
                }
            },
            [width],
        ),*/
        to: {
            backgroundPosition: width,
        },
    });

    return (
        <animated.div
            className={classes.loading}
            style={springProps}
        />
    );
};

export default LoadingPlaceholder;
