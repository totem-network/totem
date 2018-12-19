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

interface IOtherAction extends Action {
    payload?: any;
}

export type InitializeAction = IInitializeAction |
        IOtherAction;
