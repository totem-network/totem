import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import ActionButtons from '../../../containers/action-buttons/ActionButtons';
import digitalAssetsQuery from '../../../queries/digitalAssets.graphql';
import ActionButton from '../../action-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import AddDigitalAssetDialog from './AddDigitalAssetDialog';
import CategoryCard from './CategoryCard';
import DigitalAsset from './DigitalAsset';

export interface IDigitalAssetsViewProps {}

// TODO: When user clicks on Digital Assets in the menu, reset selectedAsset
export interface IDigitalAssetsViewState {
    addDigitalAssetDialog: boolean;
    selectedAsset?: string;
}

type DigitalAssetsViewProps = IDigitalAssetsViewProps & WithStyles;

class DigitalAssetsView extends Component<DigitalAssetsViewProps, IDigitalAssetsViewState> {

    constructor(props: DigitalAssetsViewProps, context?: any) {
        super(props, context);

        this.openAddDigitalAssetDialog = this.openAddDigitalAssetDialog.bind(this);
        this.closeAddDigitalAssetDialog = this.closeAddDigitalAssetDialog.bind(this);

        this.state = {
            addDigitalAssetDialog: false,
        };
    }

    public openAddDigitalAssetDialog() {
        this.setState({
            ...this.state,
            addDigitalAssetDialog: true,
        });
    }

    public closeAddDigitalAssetDialog() {
        this.setState({
            ...this.state,
            addDigitalAssetDialog: false,
        });
    }

    public selectAsset(assetContract: string) {
        this.setState({
            ...this.state,
            selectedAsset: assetContract,
        });
    }

    public render() {
        const {
            addDigitalAssetDialog,
            selectedAsset,
        } = this.state;

        const {
            container,
            assetContainer,
            icon,
        } = this.props.classes;

        if (selectedAsset) {
            return (
                <DigitalAsset
                    selectedAsset={selectedAsset}
                />
            );
        }

        return (
            <Fragment>
                <div className={container}>
                    <Query query={digitalAssetsQuery}>
                        {({ loading, error, data }: any) => {
                            if (loading) {
                                return (
                                    <LoadingBar />
                                );
                            }
                            if (error) {
                                return (
                                    <Error
                                        error={error}
                                    />
                                );
                            }

                            return data.digitalAssets.map((asset: any, index: number) => {
                                return (
                                    <CategoryCard
                                        key={index}
                                        image={asset.images[0]}
                                        name={asset.name}
                                        onClick={this.selectAsset.bind(this, asset.contract)}
                                    />
                                );
                            });
                        }}
                    </Query>
                </div>
                <ActionButtons>
                    <ActionButton
                        onClick={this.openAddDigitalAssetDialog}
                    >
                        Add asset
                    </ActionButton>
                </ActionButtons>
                <AddDigitalAssetDialog
                    closeDialog={this.closeAddDigitalAssetDialog}
                    open={addDigitalAssetDialog}
                />
            </Fragment>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        assetContainer: {
            cursor: 'pointer',
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
    };
};

export default withStyles(style)(DigitalAssetsView);
