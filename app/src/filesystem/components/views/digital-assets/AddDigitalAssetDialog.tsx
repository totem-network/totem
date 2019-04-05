import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, Fragment } from 'react';
import { Mutation } from "react-apollo";
import AddDigitalAssetForm from '../../../containers/views/digital-assets/AddDigitalAssetForm';
import addDigitalAssetMutation from '../../../mutations/addDigitalAsset.graphql';

export interface IAddDigitalAssetDialogProps {
    addDigitalAssetSubmit: () => any;
    closeDialog: () => any;
    open: boolean;
}

export interface IAddDigitalAssetDialogState {}

type AddDigitalAssetDialogProps = IAddDigitalAssetDialogProps & WithStyles;

class AddDigitalAssetDialog extends Component<AddDigitalAssetDialogProps, IAddDigitalAssetDialogState> {

    public render() {
        const {
            addDigitalAssetSubmit,
            closeDialog,
            open,
        } = this.props;

        return (
            <Dialog
                open={open}
                onClose={closeDialog}
            >
                <Mutation mutation={addDigitalAssetMutation}>
                    {(addDigitalAsset) => {
                        const handleSubmit = (values: any) => {
                            addDigitalAsset({
                                refetchQueries: [
                                    'digitalAsset',
                                    'digitalAssets',
                                ],
                                variables: {
                                    contract: values.get('contract'),
                                },
                            });
                            closeDialog();
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
                                        onClick={closeDialog}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color='primary'
                                        onClick={addDigitalAssetSubmit}
                                        variant='contained'
                                    >
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
    return {};
};

export default withStyles(style)(AddDigitalAssetDialog);
