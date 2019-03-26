import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, Fragment } from 'react';
import { Mutation, Query } from "react-apollo";
import { FormAction } from 'redux-form';
import digitalAssetsQuery from '../../../queries/digitalAssets.graphql';
import BottomButtons from '../../bottom-buttons/BottomButtons';
import BottomButton from '../../bottom-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import AddDigitalAssetDialog from './AddDigitalAssetDialog';
import CategoryCard from './CategoryCard';
import DigitalAsset from './DigitalAsset';

export interface IDigitalAssetsViewProps {
    addDigitalAssetSubmit: (form: string) => FormAction;
}

// TODO: When user clicks on Digital Assets in the menu, reset selectedAsset
export interface IDigitalAssetsViewState {
    addDigitalAssetDialog: boolean;
    selectedAsset?: string;
}

type DigitalAssetsViewProps = IDigitalAssetsViewProps & WithStyles;

class DigitalAssetsView extends Component<DigitalAssetsViewProps, IDigitalAssetsViewState> {

    constructor(props: DigitalAssetsViewProps, context?: any) {
        super(props, context);

        this.addDigitalAsset = this.addDigitalAsset.bind(this);
        this.openAddDigitalAssetDialog = this.openAddDigitalAssetDialog.bind(this);
        this.closeAddDigitalAssetDialog = this.closeAddDigitalAssetDialog.bind(this);

        this.state = {
            addDigitalAssetDialog: false,
        };
    }

    public addDigitalAsset() {
        const { addDigitalAssetSubmit } = this.props;

        addDigitalAssetSubmit('addDigitalAsset');
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
                        {({ loading, error, data }) => {
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
                <BottomButtons>
                    <BottomButton
                        onClick={this.openAddDigitalAssetDialog}
                    >
                        Add asset
                    </BottomButton>
                </BottomButtons>
                <AddDigitalAssetDialog
                    addDigitalAssetSubmit={this.addDigitalAsset}
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
