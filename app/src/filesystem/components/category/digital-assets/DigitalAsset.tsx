import { useApolloClient, useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import GET_DIGITAL_ASSET from '../../../queries/getDigitalAsset.graphql';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import AssetCard from './AssetCard';

export interface IDigitalAssetProps {
    selectedAsset: string;
}

const useStyles = makeStyles({
    assetContainer: {
        margin: '0 20px 20px 20px',
        textAlign: 'center',
        width: '120px',
    },
    container: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        overflowY: 'auto',
    },
    header: {
        color: '#000',
        margin: '0 2rem 1rem 2rem',
        width: '100%',
    },
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

const DigitalAsset = ({
    selectedAsset,
}: IDigitalAssetProps) => {
    const classes = useStyles();

    const apolloClient = useApolloClient();
    const { loading, error, data, refetch } = useQuery(GET_DIGITAL_ASSET, {
        client: apolloClient,
        variables: {
            contract: selectedAsset,
        },
    });

    const renderQuery = () => {
        if (loading) {
            return (
                <LoadingBar />
            );
        }
        if (error) {
            const retry = () => {
                refetch();
                // TODO: refetch not reloading
                // https://github.com/apollographql/react-apollo/issues/321
            };

            return (
                <Error
                    error={error}
                    retry={retry}
                />
            );
        }

        let name = '';
        if (data.digitalAsset.length > 0) {
            name = data.digitalAsset[0].asset.name;
        }

        const tokens = data.digitalAsset.map((asset: any, index: number) => {
            return (
                <AssetCard
                    key={index}
                    contract={selectedAsset}
                    description={asset.description}
                    feeFast={asset.feeFast}
                    feeSafeLow={asset.feeSafeLow}
                    image={asset.image}
                    name={asset.name}
                    token={asset.id}
                />
            );
        });

        return (
            <>
                <div className={classes.header}>
                    <Typography variant="h4">
                        {name}
                    </Typography>
                </div>
                {tokens}
            </>
        );
    };

    return (
        <div className={classes.container}>
            {renderQuery()}
        </div>
    );
};

export default DigitalAsset;
