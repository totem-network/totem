import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import {
    AddressField,
    Switch,
} from 'ui';

export interface ISendDigitalAssetFormData {
    fee: string;
    to: string;
}

export interface ISendDigitalAssetFormProps {
    assetImage: string;
    token: string;
}

export interface ISendDigitalAssetFormState {}

type SendDigitalAssetFormProps = ISendDigitalAssetFormProps &
    WithStyles;

class SendDigitalAssetForm extends Component<SendDigitalAssetFormProps, ISendDigitalAssetFormState> {

    public render() {
        const {
            assetImage,
            classes,
        } = this.props;

        return (
            <div className={classes.form}>
                <AddressField
                    label='To'
                    name='to'
                />
                <img
                    className={classes.asset}
                    src={assetImage}
                />
                <div className={classes.fee}>
                    <div>
                        <Switch
                            color='primary'
                            name='fee'
                        />
                    </div>
                    <div className={classes.fast}>
                        Fast?
                    </div>
                </div>
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        asset: {
            maxWidth: '250px',
        },
        fast: {
            color: 'rgba(0, 0, 0, 0.87)',
            margin: '.8rem 0',
        },
        fee: {
            display: 'flex',
            float: 'right',
        },
        form: {
            maxWidth: '260px',
        },
    };
};

export default withStyles(style)(SendDigitalAssetForm);
