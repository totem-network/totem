import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { Form, Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { TextField } from 'ui';
import addDigitalAssetMutation from '../../../mutations/addDigitalAsset.graphql';

export interface IAddDigitalAssetDialogProps {
    closeDialog: () => any;
    open: boolean;
}

export interface IAddDigitalAssetDialogState {}

type AddDigitalAssetDialogProps = IAddDigitalAssetDialogProps & WithStyles;

class AddDigitalAssetDialog extends Component<AddDigitalAssetDialogProps, IAddDigitalAssetDialogState> {

    public render() {
        const {
            closeDialog,
            open,
        } = this.props;

        return (
            <Dialog
                open={open}
                onClose={closeDialog}
            >
                <Mutation mutation={addDigitalAssetMutation}>
                    {(addDigitalAsset: any) => {
                        const handleSubmit = (values: any) => {
                            addDigitalAsset({
                                refetchQueries: [
                                    'digitalAsset',
                                    'digitalAssets',
                                ],
                                variables: {
                                    contract: values.contract,
                                },
                            });
                            closeDialog();
                        };

                        return (
                            <Formik
                                initialValues={{
                                    contract: '',
                                }}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <DialogTitle>
                                        Add digital asset
                                    </DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            label='Address or ENS'
                                            name='contract'
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
                                            type='submit'
                                            variant='contained'
                                        >
                                            Add asset
                                        </Button>
                                    </DialogActions>
                                </Form>
                            </Formik>
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
