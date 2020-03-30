import { Action } from 'redux';

// clear storage

export type CLEAR_STORAGE = 'app/CLEAR_STORAGE';
export const CLEAR_STORAGE: CLEAR_STORAGE = 'app/CLEAR_STORAGE';

export interface IClearStorageAction extends Action {
    type: CLEAR_STORAGE;
    payload: IClearStoragePayload;
}

export interface IClearStoragePayload {
    deleteEverything: boolean;
}

export function clearStorage(deleteEverything: boolean = false): IClearStorageAction {
    return {
        payload: {
            deleteEverything,
        },
        type: CLEAR_STORAGE,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ClearStorageAction = IClearStorageAction |
    IOtherAction;
