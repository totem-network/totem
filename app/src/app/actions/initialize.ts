import { Action } from 'redux';

// initialize

export type INITIALIZE = 'app/INITIALIZE';
export const INITIALIZE: INITIALIZE = 'app/INITIALIZE';

export interface IInitializeAction extends Action {
    type: INITIALIZE;
    payload: IInitializePayload;
}

export interface IInitializePayload {
    ethereum?: any;
}

export function initialize(ethereum?: any): IInitializeAction {
    return {
        payload: {
            ethereum,
        },
        type: INITIALIZE,
    };
}

// initialize

export type WEB3_INITIALIZED = 'app/WEB3_INITIALIZED';
export const WEB3_INITIALIZED: WEB3_INITIALIZED = 'app/WEB3_INITIALIZED';

export interface IWeb3InitializedAction extends Action {
    type: WEB3_INITIALIZED;
    payload: IWeb3InitializedPayload;
}

export interface IWeb3InitializedPayload {}

export function web3Initialized(): IWeb3InitializedAction {
    return {
        payload: {},
        type: WEB3_INITIALIZED,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type InitializeAction = IInitializeAction |
    IWeb3InitializedAction |
    IOtherAction;
