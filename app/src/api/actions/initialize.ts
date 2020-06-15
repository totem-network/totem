import { Action } from 'redux';

// api initialized

export type API_INITIALIZED = 'api/API_INITIALIZED';
export const API_INITIALIZED: API_INITIALIZED = 'api/API_INITIALIZED';

export interface IApiInitializedAction extends Action {
    type: API_INITIALIZED;
    payload: IApiInitializedPayload;
}

export interface IApiInitializedPayload {}

export function apiInitialized(): IApiInitializedAction {
    return {
        payload: {},
        type: API_INITIALIZED,
    };
}

// api initialized error

export type API_INITIALIZED_ERROR = 'api/API_INITIALIZED_ERROR';
export const API_INITIALIZED_ERROR: API_INITIALIZED_ERROR = 'api/API_INITIALIZED_ERROR';

export interface IApiInitializedErrorAction extends Action {
    type: API_INITIALIZED_ERROR;
    payload: IApiInitializedErrorPayload;
}

export interface IApiInitializedErrorPayload {}

export function apiInitializedError(): IApiInitializedErrorAction {
    return {
        payload: {},
        type: API_INITIALIZED_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type InitializedAction = IApiInitializedAction |
    IApiInitializedErrorAction |
    IOtherAction;
