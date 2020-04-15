import { useApolloClient, useQuery } from '@apollo/react-hooks';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/styles';
import React, { useRef } from 'react';
import useComponentSize from 'ui/hooks/useComponentSize';
import GET_IMAGES_PAGE from '../../../queries/getImagesPage.graphql';
import RenderQuery from '../../RenderQuery';
import ViewNavButton from '../../view-nav/Button';
import ViewNav from '../../view-nav/ViewNav';
import ImagesDataComponent from './ImagesDataComponent';

export interface IImagesViewProps {
    instance: string;
}

const useStyles = makeStyles({
    container: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        // TODO: set to auto when useComponentSize supports ResizeObserver
        overflowY: 'scroll',
    },
});

const ImagesView = ({
    instance,
}: IImagesViewProps) => {
    const classes = useStyles();

    const containerElement = useRef(null);

    const { width } = useComponentSize(containerElement);

    const apolloClient = useApolloClient();
    const { loading, error, data, refetch } = useQuery(GET_IMAGES_PAGE, {
        client: apolloClient,
        variables: {
            first: 10,
        },
    });

    return (
        <>
            <ViewNav>
                <ViewNavButton
                    icon={<StoreIcon />}
                    label={'Albums'}
                />
            </ViewNav>
            <div
                className={classes.container}
                ref={containerElement}
            >
                <RenderQuery
                    component={ImagesDataComponent}
                    data={data}
                    error={error}
                    loading={loading}
                    refetch={refetch}
                    width={width}
                />
            </div>
        </>
    );
};

export default ImagesView;
