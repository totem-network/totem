import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, ComponentType } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';
import { PasswordField } from 'ui';
import {
    ILoginMetaMaskAction,
} from './../../actions/login';
import Avatar from './../Avatar';
import CreateAccount from './CreateAccount';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;
const Box = require('3box');

export interface ILoginMetaMaskData {
    password: string;
}

export interface ILoginMetaMaskProps {
    handleSubmit?: any;
    login: () => ILoginMetaMaskAction;
}

interface ILoginMetaMaskState {
    account: string;
    profile: boolean;
}

type LoginMetaMaskProps = ILoginMetaMaskProps &
    InjectedFormProps<ILoginMetaMaskData, ILoginMetaMaskProps> &
    WithStyles<'buttonWrapper' | 'avatar'>;

class LoginMetaMask extends Component<LoginMetaMaskProps, ILoginMetaMaskState> {

    constructor(
        props: LoginMetaMaskProps,
        context?: any,
    ) {
        super(props, context);

        this.state = {
            account: '',
            profile: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    public componentDidMount() {
        // TODO: move everything in a initialize saga!

        if (
            !((window as any).ethereum &&
            (window as any).ethereum.enable)
        ) {
            return;
        }

        const callback = async (accounts: any) => {
            Box.getProfile(accounts[0]).then((profile: any) => {
                this.setState({
                    ...this.state,
                    profile: true,
                });

                console.log(profile);
            }).catch((error: any) => {
                this.setState({
                    ...this.state,
                    profile: false,
                });
            });

            Box.openBox(
                accounts[0],
                (window as any).ethereum,
            ).then((box: any) => {
                // interact with 3Box data
                box.onSyncDone(() => {
                    // box.public.get(); // set
                });
            });
            this.setState({
                ...this.state,
                account: accounts[0],
            });
        };

        // (window as any).ethereum.enable().then(callback);
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
        const { account } = this.state;
        const { avatar } = this.props.classes;

        if (!account) {
            return null;
        }

        return (
            <div className={avatar}>
                <Avatar address={account} />
            </div>
        );
    }

    protected renderCreateAccountForm() {
        const { profile } = this.state;
        const { avatar } = this.props.classes;

        if (profile) {
            return null;
        }

        return (
            <div className={avatar}>
                k
            </div>
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

export default withStyles(style)(LoginMetaMask) as ComponentType<
    ILoginMetaMaskProps &
    InjectedFormProps<ILoginMetaMaskData, ILoginMetaMaskProps>
>;
