import { Action } from 'redux';

// create Node

export type CREATE_NODE = 'database/CREATE_NODE';
export const CREATE_NODE: CREATE_NODE = 'database/CREATE_NODE';

export interface ICreateNodeAction extends Action {
    type: CREATE_NODE;
    payload: ICreateNodePayload;
}

export interface ICreateNodePayload {
    data: any;
    storage?: string | string[];
    transactionId: string;
}

export function createNode(data: any, storage?: string | string[]): ICreateNodeAction {
    // TODO: generate unique transaction id
    const transactionId = '';
    return {
        payload: {
            data,
            storage,
            transactionId,
        },
        type: CREATE_NODE,
    };
}

// Node created

export type CREATE_NODE_SUCCESS = 'database/CREATE_NODE_SUCCESS';
export const CREATE_NODE_SUCCESS: CREATE_NODE_SUCCESS = 'database/CREATE_NODE_SUCCESS';

export interface ICreateNodeSuccessAction extends Action {
    type: CREATE_NODE_SUCCESS;
    payload: ICreateNodeSuccessPayload;
}

export interface ICreateNodeSuccessPayload {
    hash: string;
    transactionId: string;
}

export function createNodeSuccess(
    transactionId: string,
    hash: string,
): ICreateNodeSuccessAction {
    return {
        payload: {
            hash,
            transactionId,
        },
        type: CREATE_NODE_SUCCESS,
    };
}

// error

export type CREATE_NODE_ERROR = 'database/CREATE_NODE_ERROR';
export const CREATE_NODE_ERROR: CREATE_NODE_ERROR = 'database/CREATE_NODE_ERROR';

export interface ICreateNodeErrorAction extends Action {
    type: CREATE_NODE_ERROR;
    payload: ICreateNodeErrorPayload;
}

export interface ICreateNodeErrorPayload {
    error: string;
    transactionId: string;
}

export function createNodeError(
    transactionId: string,
    error: string,
): ICreateNodeErrorAction {
    return {
        payload: {
            error,
            transactionId,
        },
        type: CREATE_NODE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = ICreateNodeAction |
    ICreateNodeSuccessAction |
    ICreateNodeErrorAction |
    IOtherAction;
