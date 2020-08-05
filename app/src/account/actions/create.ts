import { Action } from 'redux';

// create account

/**
 * @constant {string} CREATE_ACCOUNT - Identitfy create account action
 */
export type CREATE_ACCOUNT = 'account/CREATE_ACCOUNT';
export const CREATE_ACCOUNT: CREATE_ACCOUNT = 'account/CREATE_ACCOUNT';

/**
 * Interface for create account action object
 * @interface
 */
export interface ICreateAccountAction extends Action {
    type: CREATE_ACCOUNT;
    payload: ICreateAccountPayload;
}

/**
 * Payload of the create account action
 * @interface
 */
export interface ICreateAccountPayload {
    privateKey: string;
}

/**
 * Creates the create account action object with given paramaters
 * @param {string} privateKey - Private key of the account
 */
export function createAccount(privateKey: string): ICreateAccountAction {
    return {
        payload: {
            privateKey,
        },
        type: CREATE_ACCOUNT,
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
 * Combines all create account actions for the reducer
 * @type
 */
export type CreateAccountAction = ICreateAccountAction |
        IOtherAction;
