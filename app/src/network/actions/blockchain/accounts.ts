import { Action } from 'redux';

// add account

export type ADD_ACCOUNT = 'network/blockchain/ADD_ACCOUNT';
export const ADD_ACCOUNT: ADD_ACCOUNT = 'network/blockchain/ADD_ACCOUNT';

export interface IAddAccountAction extends Action {
    type: ADD_ACCOUNT;
    payload: IAddAccountPayload;
}

export interface IAccountConfig {
    method: string;
}

export interface IAddAccountPayload {
    config: IAccountConfig;
    platform: string;
    network: string;
}

export function addAccount(platform: string, network: string, config: IAccountConfig): IAddAccountAction {
    return {
        payload: {
            config,
            network,
            platform,
        },
        type: ADD_ACCOUNT,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type AccountsAction = IAddAccountAction |
    IOtherAction;
