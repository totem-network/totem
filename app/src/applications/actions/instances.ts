import { Action } from 'redux';

// add a instance

export type ADD_INSTANCE = 'applications/ADD_INSTANCE';
export const ADD_INSTANCE: ADD_INSTANCE = 'applications/ADD_INSTANCE';

export interface IAddInstanceAction extends Action {
    type: ADD_INSTANCE;
    payload: IAddInstancePayload;
}

export interface IAddInstancePayload {
    application: string;
    icon: string;
    id: string;
    options: object;
    themeColor: string;
    title: string;
}

export function addInstance(
    application: string,
    id: string,
    icon: string,
    themeColor: string,
    title: string,
    options: object = {},
): IAddInstanceAction {
    return {
        payload: {
            application,
            icon,
            id,
            options,
            themeColor,
            title,
        },
        type: ADD_INSTANCE,
    };
}

// close a instance

export type CLOSE_INSTANCE = 'applications/CLOSE_INSTANCE';
export const CLOSE_INSTANCE: CLOSE_INSTANCE = 'applications/CLOSE_INSTANCE';

export interface ICloseInstanceAction extends Action {
    type: CLOSE_INSTANCE;
    payload: ICloseInstancePayload;
}

export interface ICloseInstancePayload {
    id: string;
}

export function closeInstance(
    id: string,
): ICloseInstanceAction {
    return {
        payload: {
            id,
        },
        type: CLOSE_INSTANCE,
    };
}

// update a instance

export type UPDATE_INSTANCE = 'applications/UPDATE_INSTANCE';
export const UPDATE_INSTANCE: UPDATE_INSTANCE = 'applications/UPDATE_INSTANCE';

export interface IUpdateInstanceAction extends Action {
    type: UPDATE_INSTANCE;
    payload: IUpdateInstancePayload;
}

export interface IUpdateInstancePayload {
    id: string;
}

export function updateInstance(
    id: string,
): IUpdateInstanceAction {
    return {
        payload: {
            id,
        },
        type: UPDATE_INSTANCE,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type InstancesAction = IAddInstanceAction |
        ICloseInstanceAction |
        IUpdateInstanceAction |
        IOtherAction;
