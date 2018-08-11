import { Action } from 'redux';

// load Node

export type DELETE_NODE = 'database/DELETE_NODE';
export const DELETE_NODE: DELETE_NODE = 'database/DELETE_NODE';

export interface IDeleteNodeAction extends Action {
    type: DELETE_NODE;
    payload: IDeleteNodePayload;
}

export interface IDeleteNodePayload {
    hash: string;
    storage?: string | string[];
}

export function deleteNode(hash: string, storage?: string | string[]): IDeleteNodeAction {
    return {
        payload: {
            hash,
            storage,
        },
        type: DELETE_NODE,
    };
}

// Node loaded

export type DELETE_NODE_SUCCESS = 'database/DELETE_NODE_SUCCESS';
export const DELETE_NODE_SUCCESS: DELETE_NODE_SUCCESS = 'database/DELETE_NODE_SUCCESS';

export interface IDeleteNodeSuccessAction extends Action {
    type: DELETE_NODE_SUCCESS;
    payload: IDeleteNodeSuccessPayload;
}

export interface IDeleteNodeSuccessPayload {
    data: any;
    hash: string;
}

export function deleteNodeSuccess(data: any, hash: string): IDeleteNodeSuccessAction {
    return {
        payload: {
            data,
            hash,
        },
        type: DELETE_NODE_SUCCESS,
    };
}

// error

export type DELETE_NODE_ERROR = 'database/DELETE_NODE_ERROR';
export const DELETE_NODE_ERROR: DELETE_NODE_ERROR = 'database/DELETE_NODE_ERROR';

export interface IDeleteNodeErrorAction extends Action {
    type: DELETE_NODE_ERROR;
    payload: IDeleteNodeErrorPayload;
}

export interface IDeleteNodeErrorPayload {
    error: string;
    hash: string;
}

export function deleteNodeError(error: string, hash: string): IDeleteNodeErrorAction {
    return {
        payload: {
            error,
            hash,
        },
        type: DELETE_NODE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = IDeleteNodeAction |
    IDeleteNodeSuccessAction |
    IDeleteNodeErrorAction |
    IOtherAction;
