import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useState } from 'react';
import LoginMetaMask from './form/LoginMetaMask';
import LoginPrivateKey from './form/LoginPrivateKey';
import LoginMessage from './LoginMessage';

interface ILoginProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        content: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                display: 'inline-block',
                margin: '1rem',
                padding: '0',
                verticalAlign: 'middle',
            },
            [theme.breakpoints.up('lg')]: {
                margin: '2rem',
                padding: '0',
            },
            margin: '1rem 2rem',
            padding: '5vh 0',
            textAlign: 'center',
            verticalAlign: 'middle',
            width: '100%',
        },
        message: {
            textAlign: 'center',
        },
        wrapper: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                width: 'calc(60vw + 4rem)',
            },
            [theme.breakpoints.up('lg') + ', (orientation:landscape)']: {
                top: '50%',
                transform: 'translate(-50%, -50%)',
            },
            left: '50%',
            position: 'absolute',
            top: '10%',
            transform: 'translate(-50%, 0)',
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
        <>
            <div
                className={classNames([
                    classes.content,
                    classes.message,
                ])}
            >
                <LoginMessage />
            </div>
            <div className={classes.content}>
                {/*<FormControl fullWidth={true}>
                    <Select
                        onChange={handleChange}
                        value={method}
                    >
                        <MenuItem value={'metamask'}>MetaMask</MenuItem>
                        <MenuItem value={'privateKey'}>Private Key</MenuItem>
                    </Select>
                </FormControl>*/}
                {renderLoginForm(method)}
            </div>
        </>
    );
};

export default Login;
