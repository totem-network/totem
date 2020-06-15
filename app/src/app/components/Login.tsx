import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';
import CreateAccount from 'account/components/form/CreateAccount';
import loggingInSelector from 'account/selectors/loggingIn';
import providedAccountSelector from 'account/selectors/providedAccount';
import LoginForm from 'account/components/Login';
import apiInitializedSelector from 'api/selectors/apiInitialized';
import web3InitializedSelector from 'app/selectors/web3Initialized';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import GET_IDENTITY from '../queries/getIdentity.graphql';

export interface ILoginProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('sm')]: {
                left: 'calc(50% - 220px)',
                right: 'calc(50% - 220px)',
            },
            left: '1rem',
            position: 'absolute',
            right: '1rem',
            top: '25vh'
        },
        paper: {
            [theme.breakpoints.up('sm')]: {
                height: '45vh',
            },
            height: '55vh',
            overflow: 'hidden',
            position: 'relative',
        },
        progress: {
            position: 'absolute',
            width: '100%',
        },
        toggleViewButton: {
            bottom: '1rem',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%)',
        },
    };
});

const Login = ({}: ILoginProps) => {
    const providedAccount = useSelector(providedAccountSelector, shallowEqual);
    const loggingIn = useSelector(loggingInSelector, shallowEqual);
    const apiInitialized = useSelector(apiInitializedSelector, shallowEqual);
    const web3Initialized = useSelector(web3InitializedSelector, shallowEqual);

    const classes = useStyles();

    const apolloClient = useApolloClient();
    const [getIdentity, { loading, error, data, called }] = useLazyQuery(GET_IDENTITY, {
        client: apolloClient,
        variables: {
            address: providedAccount,
        },
    });

    const [showWalletView, setShowWalletView] = useState(false);

    if (apiInitialized && !called) {
        getIdentity();
    }

    // TODO: switch between create account and login if identity is detected

    const renderLoadingBar = () => {
        if (
            loggingIn ||
            !apiInitialized ||
            (loading && called)
        ) {
            return (
                <LinearProgress
                    className={classes.progress}
                />
            );
        }
        
        return null;
    };

    const renderLoginView = () => {
        if (showWalletView) {
            return (
                <div>Select Wallet</div>
            );
        }

        if (
            data &&
            data.getProfile &&
            data.getProfile.identity
        ) {
            return (
                <LoginForm />
            );
        }

        if (apiInitialized && web3Initialized) {
            return (
                <CreateAccount />
            );
        }
    };

    const toggleWalletView = () => {
        setShowWalletView(!showWalletView);
    };

    return (
        <div
            className={classes.container}
        >
            <Paper
                className={classes.paper}
                elevation={3}
            >
                {renderLoadingBar()}
                {renderLoginView()}
                <Button
                    className={classes.toggleViewButton}
                    color={'secondary'}
                    onClick={toggleWalletView}
                    startIcon={showWalletView ? <AccountCircleIcon /> : <AccountBalanceWalletIcon />}
                    variant={'contained'}
                >
                    {showWalletView ? 'Sign Up' : 'Connect with Wallet'}
                </Button>
            </Paper>
        </div>
    );
};

export default Login;
