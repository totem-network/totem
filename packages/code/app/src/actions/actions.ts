import { Action } from 'redux';

// create action

export type CREATE_ACTION = 'CREATE_ACTION';
export const CREATE_ACTION: CREATE_ACTION = 'CREATE_ACTION';

export interface ICreateActionAction extends Action {
    type: CREATE_ACTION;
    payload: ICreateActionPayload;
}

export interface IParams {
    name: string;
    type: string;
}

export interface ICreateActionPayload {
    name: string;
    params: IParams[];
}

export function createAction(name: string, params: IParams[]): ICreateActionAction {
    return {
        payload: {
            name,
            params,
        },
        type: CREATE_ACTION,
    };
}

// delete action

export type DELETE_ACTION = 'DELETE_ACTION';
export const DELETE_ACTION: DELETE_ACTION = 'DELETE_ACTION';

export interface IDeleteActionAction extends Action {
    type: DELETE_ACTION;
    payload: IDeleteActionPayload;
}

export interface IDeleteActionPayload {
    name: string;
}

export function deleteAction(name: string): IDeleteActionAction {
    return {
        payload: {
            name,
        },
        type: DELETE_ACTION,
    };
}

// delete action

export type UPDATE_ACTION = 'UPDATE_ACTION';
export const UPDATE_ACTION: UPDATE_ACTION = 'UPDATE_ACTION';

export interface IUpdateActionAction extends Action {
    type: UPDATE_ACTION;
    payload: IUpdateActionPayload;
}

export interface IUpdateActionPayload {
    name: string;
    newName: string;
    params: IParams;
}

export function updateAction(
    name: string,
    newName: string,
    params: IParams,
): IUpdateActionAction {
    return {
        payload: {
            name,
            newName,
            params,
        },
        type: UPDATE_ACTION,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ActionsAction = ICreateActionAction |
    IDeleteActionAction |
    IOtherAction;
