import { Action } from 'redux';

// add domain

export type ADD_DOMAIN = 'account/ADD_DOMAIN';
export const ADD_DOMAIN: ADD_DOMAIN = 'account/ADD_DOMAIN';

export interface IAddDomainAction extends Action {
    type: ADD_DOMAIN;
    payload: IAddDomainPayload;
}

export interface IAddDomainPayload {
    address: string;
    domain: string;
}

export function addDomain(
    domain: string,
    address: string,
): IAddDomainAction {
    return {
        payload: {
            address,
            domain,
        },
        type: ADD_DOMAIN,
    };
}

// resolve domain

export type RESOLVE_DOMAIN = 'account/RESOLVE_DOMAIN';
export const RESOLVE_DOMAIN: RESOLVE_DOMAIN = 'account/RESOLVE_DOMAIN';

export interface IResolveDomainAction extends Action {
    type: RESOLVE_DOMAIN;
    payload: IResolveDomainPayload;
}

export interface IResolveDomainPayload {
    domain: string;
}

export function resolveDomain(
    domain: string,
): IResolveDomainAction {
    return {
        payload: {
            domain,
        },
        type: RESOLVE_DOMAIN,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type DomainAction = IAddDomainAction |
        IResolveDomainAction |
        IOtherAction;
