import { Action } from 'redux';

// load Node

export type LOAD_NODE = 'database/LOAD_NODE';
export const LOAD_NODE: LOAD_NODE = 'database/LOAD_NODE';

export interface ILoadNodeAction extends Action {
    type: LOAD_NODE;
    payload: ILoadNodePayload;
}

export interface ILoadNodePayload {
    hash: string;
    storage?: string | string[];
}

export function loadNode(hash: string, storage?: string | string[]): ILoadNodeAction {
    return {
        payload: {
            hash,
            storage,
        },
        type: LOAD_NODE,
    };
}

// Node loaded

export type LOAD_NODE_SUCCESS = 'database/LOAD_NODE_SUCCESS';
export const LOAD_NODE_SUCCESS: LOAD_NODE_SUCCESS = 'database/LOAD_NODE_SUCCESS';

export interface ILoadNodeSuccessAction extends Action {
    type: LOAD_NODE_SUCCESS;
    payload: ILoadNodeSuccessPayload;
}

export interface ILoadNodeSuccessPayload {
    data: any;
    hash: string;
}

export function loadNodeSuccess(data: any, hash: string): ILoadNodeSuccessAction {
    return {
        payload: {
            data,
            hash,
        },
        type: LOAD_NODE_SUCCESS,
    };
}

// error

export type LOAD_NODE_ERROR = 'database/LOAD_NODE_ERROR';
export const LOAD_NODE_ERROR: LOAD_NODE_ERROR = 'database/LOAD_NODE_ERROR';

export interface ILoadNodeErrorAction extends Action {
    type: LOAD_NODE_ERROR;
    payload: ILoadNodeErrorPayload;
}

export interface ILoadNodeErrorPayload {
    error: string;
    hash: string;
}

export function loadNodeError(error: string, hash: string): ILoadNodeErrorAction {
    return {
        payload: {
            error,
            hash,
        },
        type: LOAD_NODE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = ILoadNodeAction |
    ILoadNodeSuccessAction |
    ILoadNodeErrorAction |
    IOtherAction;
