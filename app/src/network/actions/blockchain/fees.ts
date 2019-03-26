import { Action } from 'redux';

// fetch fee

export type FETCH_FEE = 'network/blockchain/FETCH_FEE';
export const FETCH_FEE: FETCH_FEE = 'network/blockchain/FETCH_FEE';

export interface IFetchFeeAction extends Action {
    type: FETCH_FEE;
    payload: IFetchFeePayload;
}

export interface IFetchFeePayload {
    platform: string;
    network: string;
}

export function fetchFee(platform: string, network: string): IFetchFeeAction {
    return {
        payload: {
            network,
            platform,
        },
        type: FETCH_FEE,
    };
}

// set fee

export type SET_FEE = 'network/blockchain/SET_FEE';
export const SET_FEE: SET_FEE = 'network/blockchain/SET_FEE';

export interface ISetFeeAction extends Action {
    type: SET_FEE;
    payload: ISetFeePayload;
}

export interface ISetFeePayload {
    average: string;
    fast: string;
    network: string;
    platform: string;
    safeLow: string;
}

export function setFee(
    platform: string,
    network: string,
    safeLow: string,
    average: string,
    fast: string,
): ISetFeeAction {
    return {
        payload: {
            average,
            fast,
            network,
            platform,
            safeLow,
        },
        type: SET_FEE,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type FeesAction = IFetchFeeAction |
    ISetFeeAction |
    IOtherAction;
