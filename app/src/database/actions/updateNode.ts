import { Action } from 'redux';

// load Node

export type UPDATE_NODE = 'database/UPDATE_NODE';
export const UPDATE_NODE: UPDATE_NODE = 'database/UPDATE_NODE';

export interface IUpdateNodeAction extends Action {
    type: UPDATE_NODE;
    payload: IUpdateNodePayload;
}

export interface IUpdateNodePayload {
    hash: string;
    storage?: string | string[];
}

export function updateNode(hash: string, storage?: string | string[]): IUpdateNodeAction {
    return {
        payload: {
            hash,
            storage,
        },
        type: UPDATE_NODE,
    };
}

// Node loaded

export type UPDATE_NODE_SUCCESS = 'database/UPDATE_NODE_SUCCESS';
export const UPDATE_NODE_SUCCESS: UPDATE_NODE_SUCCESS = 'database/UPDATE_NODE_SUCCESS';

export interface IUpdateNodeSuccessAction extends Action {
    type: UPDATE_NODE_SUCCESS;
    payload: IUpdateNodeSuccessPayload;
}

export interface IUpdateNodeSuccessPayload {
    data: any;
    hash: string;
}

export function updateNodeSuccess(data: any, hash: string): IUpdateNodeSuccessAction {
    return {
        payload: {
            data,
            hash,
        },
        type: UPDATE_NODE_SUCCESS,
    };
}

// error

export type UPDATE_NODE_ERROR = 'database/UPDATE_NODE_ERROR';
export const UPDATE_NODE_ERROR: UPDATE_NODE_ERROR = 'database/UPDATE_NODE_ERROR';

export interface IUpdateNodeErrorAction extends Action {
    type: UPDATE_NODE_ERROR;
    payload: IUpdateNodeErrorPayload;
}

export interface IUpdateNodeErrorPayload {
    error: string;
    hash: string;
}

export function updateNodeError(error: string, hash: string): IUpdateNodeErrorAction {
    return {
        payload: {
            error,
            hash,
        },
        type: UPDATE_NODE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = IUpdateNodeAction |
    IUpdateNodeSuccessAction |
    IUpdateNodeErrorAction |
    IOtherAction;
