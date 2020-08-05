import { Action } from 'redux';

// login with private key

/**
 * @constant {string} LOGIN_PRIVATE_KEY - Identitfy login private key action
 */
export type LOGIN_PRIVATE_KEY = 'account/LOGIN_PRIVATE_KEY';
export const LOGIN_PRIVATE_KEY: LOGIN_PRIVATE_KEY = 'account/LOGIN_PRIVATE_KEY';

/**
 * Interface for login private key action object
 * @interface
 */
export interface ILoginPrivateKeyAction extends Action {
    type: LOGIN_PRIVATE_KEY;
    payload: ILoginPrivateKeyPayload;
}

/**
 * Payload of the login private key action
 * @interface
 */
export interface ILoginPrivateKeyPayload {
    privateKey: string;
}

/**
 * Creates the login private key action object with given paramaters
 * @param {string} privateKey - Private key of the account
 */
export function loginPrivateKey(privateKey: string): ILoginPrivateKeyAction {
    return {
        payload: {
            privateKey,
        },
        type: LOGIN_PRIVATE_KEY,
    };
}

// login with metamask

/**
 * @constant {string} LOGIN_METAMASK - Identitfy login metamask action
 */
export type LOGIN_METAMASK = 'account/LOGIN_METAMASK';
export const LOGIN_METAMASK: LOGIN_METAMASK = 'account/LOGIN_METAMASK';

/**
 * Payload of the login metamask action
 * @interface
 */
export interface ILoginMetaMaskAction extends Action {
    type: LOGIN_METAMASK;
    payload: ILoginMetaMaskPayload;
}

/**
 * Payload of the login metamask action
 * @interface
 */
export interface ILoginMetaMaskPayload {
    //
}

/**
 * Creates the login metamask action object
 */
export function loginMetaMask(): ILoginMetaMaskAction {
    return {
        payload: {},
        type: LOGIN_METAMASK,
    };
}

// login success

/**
 * @constant {string} LOGIN_SUCCESS - Identitfy login success action
 */
export type LOGIN_SUCCESS = 'account/LOGIN_SUCCESS';
export const LOGIN_SUCCESS: LOGIN_SUCCESS = 'account/LOGIN_SUCCESS';

/**
 * Payload of the login success action
 * @interface
 */
export interface ILoginSuccessAction extends Action {
    type: LOGIN_SUCCESS;
    payload: ILoginSuccessPayload;
}

/**
 * Payload of the login success action
 * @interface
 */
export interface ILoginSuccessPayload {
    address: string;
}

/**
 * Creates the login success action object with given paramaters
 * @param {string} address - Address of the account
 */
export function loginSuccess(address: string): ILoginSuccessAction {
    return {
        payload: {
            address,
        },
        type: LOGIN_SUCCESS,
    };
}

/**
 * Extends Action to have an optional payload
 * @interface
 * @extends Action
 */
interface IOtherAction extends Action {
    payload?: any;
}

/**
 * Combines all login actions for the reducer
 * @type
 */
export type LoginAction = ILoginPrivateKeyAction |
        ILoginMetaMaskAction |
        ILoginSuccessAction |
        IOtherAction;
