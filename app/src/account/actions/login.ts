import { Action } from 'redux';

// login with private key

export type LOGIN_PRIVATE_KEY = 'account/LOGIN_PRIVATE_KEY';
export const LOGIN_PRIVATE_KEY: LOGIN_PRIVATE_KEY = 'account/LOGIN_PRIVATE_KEY';

export interface ILoginPrivateKeyAction extends Action {
    type: LOGIN_PRIVATE_KEY;
    payload: ILoginPrivateKeyPayload;
}

export interface ILoginPrivateKeyPayload {
    password: string;
    privateKey: string;
}

export function loginPrivateKey(privateKey: string, password: string): ILoginPrivateKeyAction {
    return {
        payload: {
            password,
            privateKey,
        },
        type: LOGIN_PRIVATE_KEY,
    };
}

// login with private key

export type LOGIN_METAMASK = 'account/LOGIN_METAMASK';
export const LOGIN_METAMASK: LOGIN_METAMASK = 'account/LOGIN_METAMASK';

export interface ILoginMetaMaskAction extends Action {
    type: LOGIN_METAMASK;
    payload: ILoginMetaMaskPayload;
}

export interface ILoginMetaMaskPayload {
    password: string;
}

export function loginMetaMask(password: string): ILoginMetaMaskAction {
    return {
        payload: {
            password,
        },
        type: LOGIN_METAMASK,
    };
}

// login success

export type LOGIN_SUCCESS = 'account/LOGIN_SUCCESS';
export const LOGIN_SUCCESS: LOGIN_SUCCESS = 'account/LOGIN_SUCCESS';

export interface ILoginSuccessAction extends Action {
    type: LOGIN_SUCCESS;
    payload: ILoginSuccessPayload;
}

export interface ILoginSuccessPayload {
    address: string;
}

export function loginSuccess(address: string): ILoginSuccessAction {
    return {
        payload: {
            address,
        },
        type: LOGIN_SUCCESS,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type AccountAction = ILoginPrivateKeyAction |
        ILoginMetaMaskAction |
        ILoginSuccessAction |
        IOtherAction;
