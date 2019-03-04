import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
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
    web3: boolean;
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
        const { account, web3 } = this.props;
        const {
            browser,
            buttonWrapper,
            installMetaMask,
        } = this.props.classes;

        if (!web3) {
            return null;
        }

        if (!account && web3) {
            return (
                <Paper className={installMetaMask}>
                    <Typography variant="h5" component="h3">
                        No Web3 provider found!
                    </Typography>
                    <Typography component="p">
                        To access Totem please install MetaMask for your browser!
                    </Typography>
                    <a
                        className={browser}
                        href='https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn'
                        target='_blank'
                    >
                        <img
                            src='/images/browser-logos/chrome/chrome_64x64.png'
                            srcSet='/images/browser-logos/chrome/chrome_64x64.png 1x,
                                /images/browser-logos/chrome/chrome_128x128.png 2x,
                                /images/browser-logos/chrome/chrome_256x256.png 4x'
                        />
                        <div>
                            Chrome
                        </div>
                    </a>
                    <a
                        className={browser}
                        href='https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn'
                        target='_blank'
                    >
                        <img
                            src='/images/browser-logos/firefox/firefox_64x64.png'
                            srcSet='/images/browser-logos/firefox/firefox_64x64.png 1x,
                                /images/browser-logos/firefox/firefox_128x128.png 2x,
                                /images/browser-logos/firefox/firefox_256x256.png 4x'
                        />
                        <div>
                            Firefox
                        </div>
                    </a>
                    <a
                        className={browser}
                        href='https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn'
                        target='_blank'
                    >
                        <img
                            src='/images/browser-logos/opera/opera_64x64.png'
                            srcSet='/images/browser-logos/opera/opera_64x64.png 1x,
                                /images/browser-logos/opera/opera_128x128.png 2x,
                                /images/browser-logos/opera/opera_256x256.png 4x'
                        />
                        <div>
                            Opera
                        </div>
                    </a>
                </Paper>
            );
        }

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

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        avatar: {
            height: '4rem',
            margin: 'auto',
            width: '4rem',
        },
        browser: {
            [theme.breakpoints.up('sm')]: {
                margin: '2rem',
            },
            color: '#333333',
            display: 'inline-block',
            margin: '1rem',
            textAlign: 'center',
            textDecoration: 'none',
        },
        buttonWrapper: {
            marginTop: '2rem',
        },
        installMetaMask: {
            paddingBottom: theme.spacing.unit * 2,
            paddingTop: theme.spacing.unit * 2,
        },
        name: {
            fontSize: '1.4rem',
            marginTop: '1.4rem',
        },
    };
};

export default withStyles(style)(LoginMetaMask);
