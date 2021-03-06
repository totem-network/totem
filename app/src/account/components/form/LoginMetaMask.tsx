import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import web3InitializedSelector from 'app/selectors/web3Initialized';
import { Form, Formik } from 'formik';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import LoadingButton from 'ui/components/button/LoadingButton';
import { loginMetaMask } from '../../actions/login';
import Avatar from '../../components/Avatar';
import Name from '../../components/Name';
import loggingInSelector from '../../selectors/loggingIn';
import providedAccountSelector from '../../selectors/providedAccount';

export interface ILoginMetaMaskData {
    password: string;
}

export interface ILoginMetaMaskProps {}

const useStyles = makeStyles((theme: Theme) => {
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
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2),
        },
        name: {
            fontSize: '1.4rem',
            marginTop: '1.4rem',
        },
    };
});

const LoginMetaMask = ({}: ILoginMetaMaskProps) => {
    const account = useSelector(providedAccountSelector, shallowEqual);
    const loggingIn = useSelector(loggingInSelector, shallowEqual);
    const web3 = useSelector(web3InitializedSelector, shallowEqual);

    const dispatch = useDispatch();

    const classes = useStyles();

    const login = () => {
        dispatch(loginMetaMask());
    };

    if (!web3) {
        return null;
    }

    if (!account && web3) {
        return (
            <Paper className={classes.installMetaMask}>
                <Typography variant="h5" component="h3">
                    No Web3 provider found!
                </Typography>
                <Typography component="p">
                    To access Vinyai please install MetaMask for your browser!
                </Typography>
                <a
                    className={classes.browser}
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
                    className={classes.browser}
                    href='https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
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
                    className={classes.browser}
                    href='https://addons.opera.com/en/extensions/details/metamask/'
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
        <Formik
            initialValues={{}}
            onSubmit={login}
        >
            <Form>
                <div className={classes.avatar}>
                    <Avatar address={account} />
                </div>
                <div className={classes.name}>
                    <Name address={account} />
                </div>
                <div className={classes.buttonWrapper}>
                    <LoadingButton
                        color={'primary'}
                        loading={loggingIn}
                        type={'submit'}
                        variant={'contained'}
                    >
                        Sign In
                    </LoadingButton>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginMetaMask;
