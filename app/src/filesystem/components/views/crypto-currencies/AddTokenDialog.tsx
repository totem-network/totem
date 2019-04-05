import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, Fragment } from 'react';
import { Mutation } from "react-apollo";
import AddTokenForm from '../../../containers/views/crypto-currencies/AddTokenForm';
import addTokenMutation from '../../../mutations/addToken.graphql';

export interface IAddTokenDialogProps {
    addTokenSubmit: () => any;
    closeDialog: () => any;
    open: boolean;
}

export interface IAddTokenDialogState {}

type AddTokenDialogProps = IAddTokenDialogProps & WithStyles;

class AddTokenDialog extends Component<AddTokenDialogProps, IAddTokenDialogState> {

    public render() {
        const {
            addTokenSubmit,
            closeDialog,
            open,
        } = this.props;

        const {
            price,
        } = this.props.classes;

        return (
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="form-dialog-title"
            >
                <Mutation mutation={addTokenMutation}>
                    {(addToken) => {
                        const handleSubmit = (values: any) => {
                            addToken({
                                refetchQueries: [
                                    'cryptoCurrencies',
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
                                    Add token
                                </DialogTitle>
                                <DialogContent>
                                    <AddTokenForm
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
                                        onClick={addTokenSubmit}
                                        variant='contained'
                                    >
                                        Add Token
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
        price: {
            padding: '4px 24px',
        },
    };
};

export default withStyles(style)(AddTokenDialog);
