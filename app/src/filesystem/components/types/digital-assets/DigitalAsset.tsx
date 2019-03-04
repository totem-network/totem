import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import digitalAssetQuery from '../../../queries/digitalAsset.graphql';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';

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

                            let name = '';
                            if (data.digitalAsset.length > 0) {
                                name = data.digitalAsset[0].digitalAsset.name;
                            }

                            const tokens = data.digitalAsset.map((asset: any, index: number) => {
                                const imageStyle = {
                                    backgroundImage: `url(${asset.image})`,
                                };

                                return (
                                    <div key={index} className={assetContainer}>
                                        <div className={image} style={imageStyle} />
                                        {asset.name}
                                    </div>
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

const style: StyleRulesCallback = (theme: Theme) => {
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
