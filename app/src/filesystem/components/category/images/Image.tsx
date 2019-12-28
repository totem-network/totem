import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
    animated,
    useSpring,
} from 'react-spring';
import GET_IMAGE_DATA from '../../../queries/getImageData.graphql';
import LoadingPlaceholder from './LoadingPlaceholder';

export interface IImageProps {
    height: number;
    imageHash: string;
    placeholderHash: string;
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
    error: {
        // TODO: decent error hint
    },
    loading: {
        // TODO: css animation or react spring (react spring if possible!)
        // (https://www.phpgang.com/facebook-style-timeline-content-loading-placeholder-with-css_4994.html)
        background: '#f6f7f8, linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)',
    },
    placeholder: {
        filter: 'blur(3px)',
    },
});

const Image = ({
    height,
    imageHash,
    placeholderHash,
    width,
}: IImageProps) => {
    const classes = useStyles();

    const apolloClient = useApolloClient();
    const { loading, error, data } = useQuery(GET_IMAGE_DATA, {
        client: apolloClient,
        variables: {
            hash: placeholderHash,
        },
    });

    const imageStyle = {
        height,
        marginLeft: '10px',
        marginTop: '10px',
        width,
    };

    if (loading) {
        return (
            <LoadingPlaceholder
                height={height}
                width={width}
            />
        );
    }

    if (error) {
        return (
            <div
                className={classes.error}
                style={imageStyle}
            />
        );
    }

    return (
        <img
            className={classes.placeholder}
            style={imageStyle}
            src={data.imageData.file}
        />
    );
};

export default Image;
