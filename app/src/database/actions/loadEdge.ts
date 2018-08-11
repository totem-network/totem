import { Action } from 'redux';

// load Edge

export type LOAD_EDGE = 'database/LOAD_EDGE';
export const LOAD_EDGE: LOAD_EDGE = 'database/LOAD_EDGE';

export interface ILoadEdgeAction extends Action {
    type: LOAD_EDGE;
    payload: ILoadEdgePayload;
}

export interface ILoadEdgePayload {
    hash: string;
    storage?: string | string[];
}

export function loadEdge(hash: string, storage?: string | string[]): ILoadEdgeAction {
    return {
        payload: {
            hash,
            storage,
        },
        type: LOAD_EDGE,
    };
}

// Edge loaded

export type LOAD_EDGE_SUCCESS = 'database/LOAD_EDGE_SUCCESS';
export const LOAD_EDGE_SUCCESS: LOAD_EDGE_SUCCESS = 'database/LOAD_EDGE_SUCCESS';

export interface ILoadEdgeSuccessAction extends Action {
    type: LOAD_EDGE_SUCCESS;
    payload: ILoadEdgeSuccessPayload;
}

export interface ILoadEdgeSuccessPayload {
    data: any;
    hash: string;
}

export function loadEdgeSuccess(data: any, hash: string): ILoadEdgeSuccessAction {
    return {
        payload: {
            data,
            hash,
        },
        type: LOAD_EDGE_SUCCESS,
    };
}

// error

export type LOAD_EDGE_ERROR = 'database/LOAD_EDGE_ERROR';
export const LOAD_EDGE_ERROR: LOAD_EDGE_ERROR = 'database/LOAD_EDGE_ERROR';

export interface ILoadEdgeErrorAction extends Action {
    type: LOAD_EDGE_ERROR;
    payload: ILoadEdgeErrorPayload;
}

export interface ILoadEdgeErrorPayload {
    error: string;
    hash: string;
}

export function loadEdgeError(error: string, hash: string): ILoadEdgeErrorAction {
    return {
        payload: {
            error,
            hash,
        },
        type: LOAD_EDGE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = ILoadEdgeAction |
    ILoadEdgeSuccessAction |
    ILoadEdgeErrorAction |
    IOtherAction;
