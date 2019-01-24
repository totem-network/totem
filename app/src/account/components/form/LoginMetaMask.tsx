import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, Fragment } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';
import { PasswordField } from 'ui';
import {
    ILoginMetaMaskAction,
} from '../../actions/login';
import Avatar from '../../containers/Avatar';
import Name from '../../containers/Name';
import CreateAccount from './CreateAccount';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface ILoginMetaMaskData {
    password: string;
}

export interface ILoginMetaMaskProps {
    account: string;
    handleSubmit?: any;
    image?: string;
    login: () => ILoginMetaMaskAction;
    name?: string;
}

interface ILoginMetaMaskState {}

type LoginMetaMaskProps = ILoginMetaMaskProps &
    InjectedFormProps<ILoginMetaMaskData, ILoginMetaMaskProps> &
    WithStyles;

class LoginMetaMask extends Component<LoginMetaMaskProps, ILoginMetaMaskState> {

    constructor(
        props: LoginMetaMaskProps,
        context?: any,
    ) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit() {
        this.props.login();
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper } = this.props.classes;

        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                {this.renderAvatar()}
                <div className={buttonWrapper}>
                    <Button type='submit' color='primary' variant="contained">
                        Login
                    </Button>
                </div>
            </Form>
        );
    }

    protected renderAvatar() {
        const { account } = this.props;
        const { avatar, name } = this.props.classes;

        if (!account) {
            return null;
        }

        // TODO: if no 3box profile render createProfileForm

        return (
            <Fragment>
                <div className={avatar}>
                    <Avatar address={account} />
                </div>
                <div className={name}>
                    <Name address={account} />
                </div>
            </Fragment>
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
    name: {
        'fontSize': '1.4rem',
        'marginTop': '1.4rem',
    },
};

export default withStyles(style)(LoginMetaMask);
