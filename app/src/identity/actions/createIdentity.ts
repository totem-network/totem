import { Action } from 'redux';

// create identity

export type CREATE_IDENTITY = 'identity/CREATE_IDENTITY';
export const CREATE_IDENTITY: CREATE_IDENTITY = 'identity/CREATE_IDENTITY';

export interface ICreateIdentityAction extends Action {
    type: CREATE_IDENTITY;
    payload: ICreateIdentityPayload;
}

export interface ICreateIdentityPayload {}

export function createIdentity(): ICreateIdentityAction {
    return {
        payload: {},
        type: CREATE_IDENTITY,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type CreateIdentityAction = ICreateIdentityAction |
        IOtherAction;
