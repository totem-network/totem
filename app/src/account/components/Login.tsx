import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React, { Component } from 'react';
import LoginMetaMask from './../containers/LoginMetaMask';
import LoginPrivateKey from './../containers/LoginPrivateKey';
import LoginMessage from './LoginMessage';

interface ILoginProps {}

interface ILoginState {
    method: string;
}

type LoginProps = ILoginProps &
    WithStyles;

class Login extends Component<LoginProps, ILoginState> {

    constructor(props: LoginProps, context?: any) {
        super(props, context);

        this.state = {
            method: 'metamask',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange(event: any) {
        this.setState({
            method: event.target.value,
        });
    }

    public render() {
        const { method } = this.state;
        const { content, message, wrapper } = this.props.classes;

        return (
            <div className={wrapper}>
                <div
                    className={classNames([
                        content,
                        message,
                    ])}
                >
                    <LoginMessage />
                </div>
                <div className={content}>
                    {/*<FormControl fullWidth={true}>
                        <Select
                            onChange={this.handleChange}
                            value={method}
                        >
                            <MenuItem value={'metamask'}>MetaMask</MenuItem>
                            <MenuItem value={'privateKey'}>Private Key</MenuItem>
                        </Select>
                    </FormControl>*/}
                    {this.renderLoginForm()}
                </div>
            </div>
        );
    }

    protected renderLoginForm() {
        // const { method } = this.state;

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
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
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
};

export default withStyles(style)(Login);
