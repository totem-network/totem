import { Action } from 'redux';

// load Edge

export type DELETE_EDGE = 'database/DELETE_EDGE';
export const DELETE_EDGE: DELETE_EDGE = 'database/DELETE_EDGE';

export interface IDeleteEdgeAction extends Action {
    type: DELETE_EDGE;
    payload: IDeleteEdgePayload;
}

export interface IDeleteEdgePayload {
    hash: string;
    storage?: string | string[];
}

export function deleteEdge(hash: string, storage?: string | string[]): IDeleteEdgeAction {
    return {
        payload: {
            hash,
            storage,
        },
        type: DELETE_EDGE,
    };
}

// Edge loaded

export type DELETE_EDGE_SUCCESS = 'database/DELETE_EDGE_SUCCESS';
export const DELETE_EDGE_SUCCESS: DELETE_EDGE_SUCCESS = 'database/DELETE_EDGE_SUCCESS';

export interface IDeleteEdgeSuccessAction extends Action {
    type: DELETE_EDGE_SUCCESS;
    payload: IDeleteEdgeSuccessPayload;
}

export interface IDeleteEdgeSuccessPayload {
    data: any;
    hash: string;
}

export function deleteEdgeSuccess(data: any, hash: string): IDeleteEdgeSuccessAction {
    return {
        payload: {
            data,
            hash,
        },
        type: DELETE_EDGE_SUCCESS,
    };
}

// error

export type DELETE_EDGE_ERROR = 'database/DELETE_EDGE_ERROR';
export const DELETE_EDGE_ERROR: DELETE_EDGE_ERROR = 'database/DELETE_EDGE_ERROR';

export interface IDeleteEdgeErrorAction extends Action {
    type: DELETE_EDGE_ERROR;
    payload: IDeleteEdgeErrorPayload;
}

export interface IDeleteEdgeErrorPayload {
    error: string;
    hash: string;
}

export function deleteEdgeError(error: string, hash: string): IDeleteEdgeErrorAction {
    return {
        payload: {
            error,
            hash,
        },
        type: DELETE_EDGE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = IDeleteEdgeAction |
    IDeleteEdgeSuccessAction |
    IDeleteEdgeErrorAction |
    IOtherAction;
