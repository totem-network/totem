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

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface ILoginMetaMaskData {
    password: string;
}

export interface ILoginMetaMaskProps {
    handleSubmit?: any;
    login: (password: string) => ILoginMetaMaskAction;
}

interface ILoginMetaMaskState {
    account: string;
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
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    public componentDidMount() {
        if (
            !((window as any).Web3 &&
            (window as any).web3 &&
            (window as any).web3.currentProvider)
        ) {
            return;
        }

        const web3 = new (window as any).Web3((window as any).web3.currentProvider);

        const callback = (accounts: any) => {
            this.setState({
                account: accounts[0],
            });
        };

        this.setState({
            account: web3.eth.accounts[0],
        });
    }

    public onSubmit(values: any) {
        const password = values.get('password');

        this.props.login(password);
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper } = this.props.classes;

        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                {/*<div>
                    <Field
                        component={PasswordField}
                        label='Password'
                        name='password'
                    />
                </div>*/}
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
