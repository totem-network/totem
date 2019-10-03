import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import digitalAssetQuery from '../../../queries/digitalAsset.graphql';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import AssetCard from './AssetCard';

export interface IDigitalAssetProps {
    selectedAsset: string;
}

export interface IDigitalAssetState {}

type DigitalAssetProps = IDigitalAssetProps & WithStyles;

class DigitalAsset extends Component<DigitalAssetProps, IDigitalAssetState> {

    public render() {
        const {
            selectedAsset,
        } = this.props;

        const {
            assetContainer,
            container,
            header,
            image,
        } = this.props.classes;

        const queryVariables = {
            contract: selectedAsset,
        };

        return (
            <Fragment>
                <div className={container}>
                    <Query query={digitalAssetQuery} variables={queryVariables}>
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
                                        image={asset.image}
                                        name={asset.name}
                                        token={asset.id}
                                    />
                                );
                            });

                            return (
                                <Fragment>
                                    <div className={header}>
                                        <Typography variant="h4">
                                            {name}
                                        </Typography>
                                    </div>
                                    {tokens}
                                </Fragment>
                            );
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}

const style: StyleRulesCallback<Theme, IDigitalAssetProps> = (theme: Theme) => {
    return {
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
    };
};

export default withStyles(style)(DigitalAsset);
