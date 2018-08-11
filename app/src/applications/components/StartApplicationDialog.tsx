import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';
import { TextField } from 'ui';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface IStartApplicationDialogData {
    url: string;
}

export interface IStartApplicationDialogProps {
    changeUrl: any;
    closeHandler: any;
    open: boolean;
    startApplication: any;
}

export interface IStartApplicationDialogState {}

class StartApplicationDialog extends Component<
    IStartApplicationDialogProps & InjectedFormProps<IStartApplicationDialogData, IStartApplicationDialogProps>,
    IStartApplicationDialogState
> {

    public render() {
        const {
            changeUrl,
            closeHandler,
            handleSubmit,
            open,
            reset,
            startApplication,
        } = this.props;

        const onSubmit = () => {
            startApplication();
            reset();
        };

        return (
            <Dialog open={open} onClose={closeHandler}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>
                        Open dApp
                    </DialogTitle>
                    <DialogContent>
                        <Field
                            component={TextField}
                            label='URL'
                            name='url'
                            onChange={changeUrl}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>
                            Start dApp
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }
}

export default StartApplicationDialog;
