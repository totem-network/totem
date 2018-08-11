import { Action } from 'redux';

// create Edge

export type CREATE_EDGE = 'database/CREATE_EDGE';
export const CREATE_EDGE: CREATE_EDGE = 'database/CREATE_EDGE';

export interface ICreateEdgeAction extends Action {
    type: CREATE_EDGE;
    payload: ICreateEdgePayload;
}

export interface ICreateEdgePayload {
    data?: any;
    from: string;
    storage?: string | string[];
    to: string;
    transactionId: string;
}

export function createEdge(
    transactionId: string,
    from: string,
    to: string,
    data?: any,
    storage?: string | string[]
): ICreateEdgeAction {
    return {
        payload: {
            data,
            from,
            storage,
            to,
            transactionId,
        },
        type: CREATE_EDGE,
    };
}

// Edge created

export type CREATE_EDGE_SUCCESS = 'database/CREATE_EDGE_SUCCESS';
export const CREATE_EDGE_SUCCESS: CREATE_EDGE_SUCCESS = 'database/CREATE_EDGE_SUCCESS';

export interface ICreateEdgeSuccessAction extends Action {
    type: CREATE_EDGE_SUCCESS;
    payload: ICreateEdgeSuccessPayload;
}

export interface ICreateEdgeSuccessPayload {
    transactionId: string;
    hash: string;
}

export function createEdgeSuccess(
    transactionId: string,
    hash: string,
): ICreateEdgeSuccessAction {
    return {
        payload: {
            hash,
            transactionId,
        },
        type: CREATE_EDGE_SUCCESS,
    };
}

// error

export type CREATE_EDGE_ERROR = 'database/CREATE_EDGE_ERROR';
export const CREATE_EDGE_ERROR: CREATE_EDGE_ERROR = 'database/CREATE_EDGE_ERROR';

export interface ICreateEdgeErrorAction extends Action {
    type: CREATE_EDGE_ERROR;
    payload: ICreateEdgeErrorPayload;
}

export interface ICreateEdgeErrorPayload {
    transactionId: string;
    error: string;
}

export function createEdgeError(transactionId: string, error: string): ICreateEdgeErrorAction {
    return {
        payload: {
            error,
            transactionId,
        },
        type: CREATE_EDGE_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = ICreateEdgeAction |
    ICreateEdgeSuccessAction |
    ICreateEdgeErrorAction |
    IOtherAction;
