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
    onlyPlaceholder?: boolean;
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
    onlyPlaceholder,
    placeholderHash,
    width,
}: IImageProps) => {
    const classes = useStyles();

    // TODO: queries are fetched in a blocking order, but this should be possible
    // Query A send
    // Query B send
    // Query B resolved
    // Query A resolved

    // Possible solution -> fetch metadata for justified layout
    // then fetch all placeholders needed for view + scroll view in a paginatable imagesDataQuery
    // then fetch the thumbnail here but only for in view pics

    const apolloClient = useApolloClient();
    const placeholderQuery = useQuery(GET_IMAGE_DATA, {
        client: apolloClient,
        onCompleted: () => {
            alert('placeholder');
        },
        variables: {
            hash: placeholderHash,
        },
    });

    const imageQuery = useQuery(GET_IMAGE_DATA, {
        client: apolloClient,
        onCompleted: () => {
            alert('image');
        },
        skip: onlyPlaceholder,
        variables: {
            hash: imageHash,
        },
    });

    const loading = placeholderQuery.loading;
    const error = placeholderQuery.error;
    const data = placeholderQuery.data;

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
