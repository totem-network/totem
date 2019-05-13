import { Action } from 'redux';

// login with private key

export type LOGIN_PRIVATE_KEY = 'account/LOGIN_PRIVATE_KEY';
export const LOGIN_PRIVATE_KEY: LOGIN_PRIVATE_KEY = 'account/LOGIN_PRIVATE_KEY';

export interface ILoginPrivateKeyAction extends Action {
    type: LOGIN_PRIVATE_KEY;
    payload: ILoginPrivateKeyPayload;
}

export interface ILoginPrivateKeyPayload {
    privateKey: string;
}

export function loginPrivateKey(privateKey: string): ILoginPrivateKeyAction {
    return {
        payload: {
            privateKey,
        },
        type: LOGIN_PRIVATE_KEY,
    };
}

// login with meta mask

export type LOGIN_METAMASK = 'account/LOGIN_METAMASK';
export const LOGIN_METAMASK: LOGIN_METAMASK = 'account/LOGIN_METAMASK';

export interface ILoginMetaMaskAction extends Action {
    type: LOGIN_METAMASK;
    payload: ILoginMetaMaskPayload;
}

export interface ILoginMetaMaskPayload {
    //
}

export function loginMetaMask(): ILoginMetaMaskAction {
    return {
        payload: {},
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

export type LoginAction = ILoginPrivateKeyAction |
        ILoginMetaMaskAction |
        ILoginSuccessAction |
        IOtherAction;
