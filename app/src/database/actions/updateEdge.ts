import { Action } from 'redux';

// load Edge

export type UPDATE_EDGE = 'database/UPDATE_EDGE';
export const UPDATE_EDGE: UPDATE_EDGE = 'database/UPDATE_EDGE';

export interface IUpdateEdgeAction extends Action {
    type: UPDATE_EDGE;
    payload: IUpdateEdgePayload;
}

export interface IUpdateEdgePayload {
    hash: string;
    storage?: string | string[];
}

export function updateEdge(hash: string, storage?: string | string[]): IUpdateEdgeAction {
    return {
        payload: {
            hash,
            storage,
        },
        type: UPDATE_EDGE,
    };
}

// Edge loaded

export type UPDATE_EDGE_SUCCESS = 'database/UPDATE_EDGE_SUCCESS';
export const UPDATE_EDGE_SUCCESS: UPDATE_EDGE_SUCCESS = 'database/UPDATE_EDGE_SUCCESS';

export interface IUpdateEdgeSuccessAction extends Action {
    type: UPDATE_EDGE_SUCCESS;
    payload: IUpdateEdgeSuccessPayload;
}

export interface IUpdateEdgeSuccessPayload {
    data: any;
    hash: string;
}

export function updateEdgeSuccess(data: any, hash: string): IUpdateEdgeSuccessAction {
    return {
        payload: {
            data,
            hash,
        },
        type: UPDATE_EDGE_SUCCESS,
    };
}

// error

export type UPDATE_EDGE_ERROR = 'database/UPDATE_EDGE_ERROR';
export const UPDATE_EDGE_ERROR: UPDATE_EDGE_ERROR = 'database/UPDATE_EDGE_ERROR';

export interface IUpdateEdgeErrorAction extends Action {
    type: UPDATE_EDGE_ERROR;
    payload: IUpdateEdgeErrorPayload;
}

export interface IUpdateEdgeErrorPayload {
    error: string;
    hash: string;
}

export function updateEdgeError(error: string, hash: string): IUpdateEdgeErrorAction {
    return {
        payload: {
            error,
            hash,
        },
        type: UPDATE_EDGE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = IUpdateEdgeAction |
    IUpdateEdgeSuccessAction |
    IUpdateEdgeErrorAction |
    IOtherAction;
