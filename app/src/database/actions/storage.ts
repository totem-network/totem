import { Action } from 'redux';

// load Node

export type STORAGE_READ = 'database/STORAGE_READ';
export const STORAGE_READ: STORAGE_READ = 'database/STORAGE_READ';

export interface IStorageReadAction extends Action {
    type: STORAGE_READ;
    payload: IStorageReadPayload;
}

export interface IStorageReadPayload {
    hash: string;
    loader?: string | string[];
}

export function storageRead(hash: string, loader?: string | string[]): IStorageReadAction {
    return {
        payload: {
            hash,
            loader,
        },
        type: STORAGE_READ,
    };
}

// Storage read

export type STORAGE_READ_SUCCESS = 'database/STORAGE_READ_SUCCESS';
export const STORAGE_READ_SUCCESS: STORAGE_READ_SUCCESS = 'database/STORAGE_READ_SUCCESS';

export interface IStorageReadSuccessAction extends Action {
    type: STORAGE_READ_SUCCESS;
    payload: IStorageReadSuccessPayload;
}

export interface IStorageReadSuccessPayload {
    data: any;
    hash: string;
    loader: string;
}

export function storageReadSuccess(data: any, hash: string, loader: string): IStorageReadSuccessAction {
    return {
        payload: {
            data,
            hash,
            loader,
        },
        type: STORAGE_READ_SUCCESS,
    };
}

// error

export type STORAGE_READ_ERROR = 'database/STORAGE_READ_ERROR';
export const STORAGE_READ_ERROR: STORAGE_READ_ERROR = 'database/STORAGE_READ_ERROR';

export interface IStorageReadErrorAction extends Action {
    type: STORAGE_READ_ERROR;
    payload: IStorageReadErrorPayload;
}

export interface IStorageReadErrorPayload {
    error: string;
    hash: string;
    loader: string;
}

export function storageReadError(error: string, hash: string, loader: string): IStorageReadErrorAction {
    return {
        payload: {
            error,
            hash,
            loader,
        },
        type: STORAGE_READ_ERROR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type StorageAction = IStorageReadAction |
    IStorageReadErrorAction |
    IStorageReadSuccessAction |
    IOtherAction;
