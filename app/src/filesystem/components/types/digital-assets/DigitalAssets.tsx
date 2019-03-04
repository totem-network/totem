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
import AddDigitalAssetForm from '../../../containers/types/digital-assets/AddDigitalAssetForm';
import addDigitalAssetMutation from '../../../mutations/addDigitalAsset.graphql';
import digitalAssetsQuery from '../../../queries/digitalAssets.graphql';
import BottomButtons from '../../bottom-buttons/BottomButtons';
import BottomButton from '../../bottom-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import CategoryImage from './CategoryImage';
import DigitalAsset from './DigitalAsset';

export interface IDigitalAssetsProps {
    addDigitalAssetSubmit: (form: string) => FormAction;
}

// TODO: When user clicks on Digital Assets in the menu, reset selectedAsset
export interface IDigitalAssetsState {
    addDigitalAssetDialog: boolean;
    selectedAsset?: string;
}

type DigitalAssetsProps = IDigitalAssetsProps & WithStyles;

class DigitalAssets extends Component<DigitalAssetsProps, IDigitalAssetsState> {

    constructor(props: DigitalAssetsProps, context?: any) {
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
                                    <Error />
                                );
                            }

                            return data.digitalAssets.map((asset: any, index: number) => {
                                return (
                                    <div
                                        className={assetContainer}
                                        key={index}
                                        onClick={this.selectAsset.bind(this, asset.contract)}
                                    >
                                        <CategoryImage
                                            images={asset.images}
                                        />
                                        {asset.name}
                                    </div>
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
                {this.renderAddDigitalAssetDialog()}
            </Fragment>
        );
    }

    protected renderAddDigitalAssetDialog() {
        return (
            <Dialog
                open={this.state.addDigitalAssetDialog}
                onClose={this.closeAddDigitalAssetDialog}
            >
                <Mutation mutation={addDigitalAssetMutation}>
                    {(addDigitalAsset) => {
                        const handleSubmit = (values: any) => {
                            this.closeAddDigitalAssetDialog();
                            addDigitalAsset({
                                variables: {
                                    contract: values.get('contract'),
                                },
                            });
                        };

                        return (
                            <Fragment>
                                <DialogTitle>
                                    Add digital asset
                                </DialogTitle>
                                <DialogContent>
                                    <AddDigitalAssetForm
                                        onSubmit={handleSubmit}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={this.closeAddDigitalAssetDialog}
                                    >
                                        Cancel
                                    </Button>
                                        <Button onClick={this.addDigitalAsset}>
                                            Add asset
                                        </Button>
                                </DialogActions>
                            </Fragment>
                        );
                    }}
                </Mutation>
            </Dialog>
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

export default withStyles(style)(DigitalAssets);
