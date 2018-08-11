import { Action } from 'redux';

// add a window

export type ADD_WINDOW = 'applications/ADD_WINDOW';
export const ADD_WINDOW: ADD_WINDOW = 'applications/ADD_WINDOW';

export interface IAddWindowAction extends Action {
    type: ADD_WINDOW;
    payload: IAddWindowPayload;
}

export interface IAddWindowPayload {
    height: number;
    instance: string;
    width: number;
    x: number;
    y: number;
}

export function addWindow(
    instance: string,
    width: number,
    height: number,
    x: number,
    y: number,
): IAddWindowAction {
    return {
        payload: {
            height,
            instance,
            width,
            x,
            y,
        },
        type: ADD_WINDOW,
    };
}

// close a window

export type CLOSE_WINDOW = 'applications/CLOSE_WINDOW';
export const CLOSE_WINDOW: CLOSE_WINDOW = 'applications/CLOSE_WINDOW';

export interface ICloseWindowAction extends Action {
    type: CLOSE_WINDOW;
    payload: ICloseWindowPayload;
}

export interface ICloseWindowPayload {
    instance: string;
}

export function closeWindow(
    instance: string,
): ICloseWindowAction {
    return {
        payload: {
            instance,
        },
        type: CLOSE_WINDOW,
    };
}

// focus a window

export type FOCUS_WINDOW = 'applications/FOCUS_WINDOW';
export const FOCUS_WINDOW: FOCUS_WINDOW = 'applications/FOCUS_WINDOW';

export interface IFocusWindowAction extends Action {
    type: FOCUS_WINDOW;
    payload: IFocusWindowPayload;
}

export interface IFocusWindowPayload {
    instance: string;
}

export function focusWindow(
    instance: string,
): IFocusWindowAction {
    return {
        payload: {
            instance,
        },
        type: FOCUS_WINDOW,
    };
}

// minimize a window

export type MINIMIZE_WINDOW = 'applications/MINIMIZE_WINDOW';
export const MINIMIZE_WINDOW: MINIMIZE_WINDOW = 'applications/MINIMIZE_WINDOW';

export interface IMinimizeWindowAction extends Action {
    type: MINIMIZE_WINDOW;
    payload: IMinimizeWindowPayload;
}

export interface IMinimizeWindowPayload {
    instance: string;
}

export function minimizeWindow(
    instance: string,
): IMinimizeWindowAction {
    return {
        payload: {
            instance,
        },
        type: MINIMIZE_WINDOW,
    };
}

// minimize all windows

export type MINIMIZE_ALL = 'applications/MINIMIZE_ALL';
export const MINIMIZE_ALL: MINIMIZE_ALL = 'applications/MINIMIZE_ALL';

export interface IMinimizeAllAction extends Action {
    type: MINIMIZE_ALL;
    payload: IMinimizeAllPayload;
}

export interface IMinimizeAllPayload {}

export function minimizeAll(): IMinimizeAllAction {
    return {
        payload: {},
        type: MINIMIZE_ALL,
    };
}

// move a window

export type MOVE_WINDOW = 'applications/MOVE_WINDOW';
export const MOVE_WINDOW: MOVE_WINDOW = 'applications/MOVE_WINDOW';

export interface IMoveWindowAction extends Action {
    type: MOVE_WINDOW;
    payload: IMoveWindowPayload;
}

export interface IMoveWindowPayload {
    instance: string;
    x: number;
    y: number;
}

export function moveWindow(
    instance: string,
    x: number,
    y: number,
): IMoveWindowAction {
    return {
        payload: {
            instance,
            x,
            y,
        },
        type: MOVE_WINDOW,
    };
}

// resize a window

export type RESIZE_WINDOW = 'applications/RESIZE_WINDOW';
export const RESIZE_WINDOW: RESIZE_WINDOW = 'applications/RESIZE_WINDOW';

export interface IResizeWindowAction extends Action {
    type: RESIZE_WINDOW;
    payload: IResizeWindowPayload;
}

export interface IResizeWindowPayload {
    instance: string;
    width: number;
    height: number;
}

export function resizeWindow(
    instance: string,
    width: number,
    height: number,
): IResizeWindowAction {
    return {
        payload: {
            height,
            instance,
            width,
        },
        type: RESIZE_WINDOW,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type WindowsAction = IAddWindowAction |
        ICloseWindowAction |
        IFocusWindowAction |
        IMinimizeWindowAction |
        IMinimizeAllAction |
        IMoveWindowAction |
        IResizeWindowAction |
        IOtherAction;
