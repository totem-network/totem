
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import ActionButtons from '../../../containers/action-buttons/ActionButtons';
import cryptoCurrenciesQuery from '../../../queries/cryptoCurrencies.graphql';
import ActionButton from '../../action-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';

export interface IImagesViewProps {}

export interface IImagesViewState {
    addTokenDialog: boolean;
}

type ImagesViewProps = IImagesViewProps & WithStyles;

class ImagesView extends Component<ImagesViewProps, IImagesViewState> {

    constructor(props: ImagesViewProps, context?: any) {
        super(props, context);

        this.addToken = this.addToken.bind(this);
        this.openAddTokenDialog = this.openAddTokenDialog.bind(this);
        this.closeAddTokenDialog = this.closeAddTokenDialog.bind(this);

        this.state = {
            addTokenDialog: false,
        };
    }

    public addToken() {
        //
    }

    public openAddTokenDialog() {
        this.setState({
            ...this.state,
            addTokenDialog: true,
        });
    }

    public closeAddTokenDialog() {
        this.setState({
            ...this.state,
            addTokenDialog: false,
        });
    }

    public render() {
        const {
            addTokenDialog,
        } = this.state;

        const {
            container,
        } = this.props.classes;

        return (
            <Fragment>
                <div className={container}>
                    <Query query={cryptoCurrenciesQuery}>
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

                            const rows = data.cryptoCurrencies.map((currency: any, index: number) => {
                                return null;
                            });

                            return (
                                <Table>
                                    {rows}
                                </Table>
                            );
                        }}
                    </Query>
                </div>
                <ActionButtons>
                    <ActionButton
                        onClick={this.openAddTokenDialog}
                    >
                        Add token
                    </ActionButton>
                </ActionButtons>
            </Fragment>
        );
    }
}

const style: StyleRulesCallback<Theme, IImagesViewProps> = (theme: Theme) => {
    return {
        container: {
            alignContent: 'flex-start',
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%',
            overflowY: 'auto',
        },
    };
};

export default withStyles(style)(ImagesView);
