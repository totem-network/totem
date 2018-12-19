import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, ComponentType } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';
import {
    ICreateAccountAction,
} from './../../actions/create';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;
const Box = require('3box');

export interface ICreateAccountData {
    name: string;
}

export interface ICreateAccountProps {
    handleSubmit?: any;
    createAccount: () => ICreateAccountAction;
}

interface ICreateAccountState {}

type CreateAccountProps = ICreateAccountProps &
    InjectedFormProps<ICreateAccountData, ICreateAccountProps> &
    WithStyles<'buttonWrapper' | 'avatar'>;

class CreateAccount extends Component<CreateAccountProps, ICreateAccountState> {

    constructor(
        props: CreateAccountProps,
        context?: any,
    ) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit() {
        this.props.createAccount();
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper } = this.props.classes;

        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field />
                <div className={buttonWrapper}>
                    <Button type='submit' color='primary' variant="contained">
                        Create Profile
                    </Button>
                </div>
            </Form>
        );
    }
}

const style: StyleRules = {
    avatar: {
        'height': '4rem',
        'margin': 'auto',
        'width': '4rem',
    },
    buttonWrapper: {
        'marginTop': '2rem',
    },
};

export default withStyles(style)(CreateAccount) as ComponentType<
    ICreateAccountProps &
    InjectedFormProps<ICreateAccountData, ICreateAccountProps>
>;
