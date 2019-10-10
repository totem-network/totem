import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useState } from 'react';
import LoginMetaMask from './../containers/LoginMetaMask';
import LoginPrivateKey from './../containers/LoginPrivateKey';
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
                width: '30vw',
            },
            [theme.breakpoints.up('lg')]: {
                margin: '2rem',
                padding: '0',
                width: '30vw',
            },
            margin: '1rem 2rem',
            padding: '5vh 0',
            textAlign: 'center',
            verticalAlign: 'middle',
            width: '65vw',
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

    // TODO: remove process.type and query it from redux store -> makes it testable
    if (process.type !== 'renderer') {
        return (
            <LoginMetaMask />
        );
    } else {
        return (
            <LoginPrivateKey />
        );
    }

    /*switch (method) {
        case 'metamask':
            return (
                <LoginMetaMask />
            );
        case 'privateKey':
        default:
            return (
                <LoginPrivateKey />
            );
    }*/
};

const Login = ({}: ILoginProps) => {
    const classes = useStyles();

    const [method, setMethod] = useState('metamask');

    const handleChange = (event: any) => {
        setMethod(event.target.value);
    };

    return (
        <div className={classes.wrapper}>
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
        </div>
    );
};

export default Login;
