import { Action } from 'redux';

// create account

export type CREATE_ACCOUNT = 'account/CREATE_ACCOUNT';
export const CREATE_ACCOUNT: CREATE_ACCOUNT = 'account/CREATE_ACCOUNT';

export interface ICreateAccountAction extends Action {
    type: CREATE_ACCOUNT;
    payload: ICreateAccountPayload;
}

export interface ICreateAccountPayload {
    privateKey: string;
}

export function createAccount(privateKey: string): ICreateAccountAction {
    return {
        payload: {
            privateKey,
        },
        type: CREATE_ACCOUNT,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type CreateAccountAction = ICreateAccountAction |
        IOtherAction;
