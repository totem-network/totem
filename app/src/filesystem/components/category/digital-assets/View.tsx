import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import ActionButtons from '../../../containers/action-buttons/ActionButtons';
import digitalAssetsQuery from '../../../queries/digitalAssets.graphql';
import ActionButton from '../../action-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import ViewNavButton from '../../view-nav/Button';
import ViewNav from '../../view-nav/ViewNav';
import AddDigitalAssetDialog from './AddDigitalAssetDialog';
import CategoryCard from './CategoryCard';
import DigitalAsset from './DigitalAsset';

export interface IDigitalAssetsViewProps {}

const useStyles = makeStyles({
    container: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        overflowY: 'auto',
    },
});

const DigitalAssetsView = ({}: IDigitalAssetsViewProps) => {
    const classes = useStyles();

    const [addDigitalAssetDialog, setAddDigitalAssetDialog] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

    // TODO: When user clicks on Digital Assets in the menu, reset selectedAsset

    const openAddDigitalAssetDialog = () => {
        setAddDigitalAssetDialog(true);
    };

    const closeAddDigitalAssetDialog = () => {
        setAddDigitalAssetDialog(false);
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
                <Query query={digitalAssetsQuery}>
                    {({ loading, error, data, refetch }: any) => {
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
                    }}
                </Query>
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
