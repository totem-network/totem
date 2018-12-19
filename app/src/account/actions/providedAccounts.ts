import { Action } from 'redux';

// initialisation finished

export type SET_PROVIDED_ACCOUNTS = 'account/SET_PROVIDED_ACCOUNTS';
export const SET_PROVIDED_ACCOUNTS: SET_PROVIDED_ACCOUNTS = 'account/SET_PROVIDED_ACCOUNTS';

export interface ISetProvidedAccountsAction extends Action {
    type: SET_PROVIDED_ACCOUNTS;
    payload: ISetProvidedAccountsPayload;
}

export interface ISetProvidedAccountsPayload {
    accounts?: string[];
}

export function setProvidedAccounts(accounts?: string[]): ISetProvidedAccountsAction {
    return {
        payload: {
            accounts,
        },
        type: SET_PROVIDED_ACCOUNTS,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ProvidedAccountsAction = ISetProvidedAccountsAction |
        IOtherAction;
