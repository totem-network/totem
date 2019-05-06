import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { Form, Formik } from 'formik';
import React, { Component } from 'react';
import {
    ICreateAccountAction,
} from './../../actions/create';

export interface ICreateAccountData {
    name: string;
}

export interface ICreateAccountProps {
    handleSubmit?: any;
    createAccount: () => ICreateAccountAction;
}

interface ICreateAccountState {}

type CreateAccountProps = ICreateAccountProps &
    WithStyles;

class CreateAccount extends Component<CreateAccountProps, ICreateAccountState> {

    constructor(
        props: CreateAccountProps,
        context?: any,
    ) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit() {
        this.props.createAccount();
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper } = this.props.classes;

        return (
            <Formik
                initialValues={{}}
                onSubmit={this.handleSubmit}
            >
                <Form>
                    <div className={buttonWrapper}>
                        <Button type='submit' color='primary' variant="contained">
                            Create Profile
                        </Button>
                    </div>
                </Form>
            </Formik>
        );
    }
}

const style: StyleRules = {
    avatar: {
        height: '4rem',
        margin: 'auto',
        width: '4rem',
    },
    buttonWrapper: {
        marginTop: '2rem',
    },
};

export default withStyles(style)(CreateAccount);
