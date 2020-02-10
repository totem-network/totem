import { useApolloClient, useQuery } from '@apollo/react-hooks';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import GET_DIGITAL_ASSETS from '../../../queries/getDigitalAssets.graphql';
import ActionButtons from '../../action-buttons/ActionButtons';
import ActionButton from '../../action-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import ViewNavButton from '../../view-nav/Button';
import ViewNav from '../../view-nav/ViewNav';
import AddDigitalAssetDialog from './AddDigitalAssetDialog';
import CategoryCard from './CategoryCard';
import DigitalAsset from './DigitalAsset';

export interface IDigitalAssetsViewProps {
    instance: string;
}

const useStyles = makeStyles({
    container: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        overflowY: 'auto',
    },
});

const DigitalAssetsView = ({
    instance,
}: IDigitalAssetsViewProps) => {
    const classes = useStyles();

    const [addDigitalAssetDialog, setAddDigitalAssetDialog] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

    const apolloClient = useApolloClient();
    const { loading, error, data, refetch } = useQuery(GET_DIGITAL_ASSETS, {
        client: apolloClient,
    });

    // TODO: When user clicks on Digital Assets in the menu, reset selectedAsset

    const openAddDigitalAssetDialog = () => {
        setAddDigitalAssetDialog(true);
    };

    const closeAddDigitalAssetDialog = () => {
        setAddDigitalAssetDialog(false);
    };

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

        return data.digitalAssets.map((asset: any, index: number) => {
            const handleClick = () => {
                setSelectedAsset(asset.contract);
            };

            return (
                <CategoryCard
                    key={index}
                    image={asset.images[0]}
                    name={asset.name}
                    onClick={handleClick}
                />
            );
        });
    };

    if (selectedAsset) {
        return (
            <DigitalAsset
                selectedAsset={selectedAsset}
            />
        );
    }

    return (
        <>
            <ViewNav>
                <ViewNavButton
                    icon={<StoreIcon />}
                    label={'Marketplace'}
                />
            </ViewNav>
            <div className={classes.container}>
                {renderQuery()}
            </div>
            <ActionButtons>
                <ActionButton
                    onClick={openAddDigitalAssetDialog}
                >
                    Add asset
                </ActionButton>
            </ActionButtons>
            <AddDigitalAssetDialog
                closeDialog={closeAddDigitalAssetDialog}
                open={addDigitalAssetDialog}
            />
        </>
    );
};

export default DigitalAssetsView;
