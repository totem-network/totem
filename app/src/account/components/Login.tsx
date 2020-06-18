import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import LoginMetaMask from './form/LoginMetaMask';
import LoginPrivateKey from './form/LoginPrivateKey';

interface ILoginProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                display: 'inline-block',
            },
            margin: '0',
            padding: '5vh 0',
            textAlign: 'center',
            verticalAlign: 'middle',
            width: '100%',
        },
    };
});

const renderLoginForm = (method: string) => {
    switch (method) {
        case 'metamask':
            return (
                <LoginMetaMask />
            );
        case 'privateKey':
        default:
            return (
                <LoginPrivateKey />
            );
    }
};

const Login = ({}: ILoginProps) => {
    const classes = useStyles();

    const [method, setMethod] = useState('metamask');

    const handleChange = (event: any) => {
        setMethod(event.target.value);
    };

    return (
        <div className={classes.container}>
            {renderLoginForm(method)}
        </div>
    );
};

export default Login;
