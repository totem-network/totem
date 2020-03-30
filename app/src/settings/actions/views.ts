import { Action } from 'redux';

export type ViewType = 'account';

// show view

export type SHOW_VIEW = 'settings/SHOW_VIEW';
export const SHOW_VIEW: SHOW_VIEW = 'settings/SHOW_VIEW';

export interface IShowViewAction extends Action {
    type: SHOW_VIEW;
    payload: IShowViewPayload;
}

export interface IShowViewPayload {
    view: ViewType;
}

export function showView(view: ViewType): IShowViewAction {
    return {
        payload: {
            view,
        },
        type: SHOW_VIEW,
    };
}

// hide view

export type HIDE_VIEW = 'settings/HIDE_VIEW';
export const HIDE_VIEW: HIDE_VIEW = 'settings/HIDE_VIEW';

export interface IHideViewAction extends Action {
    type: HIDE_VIEW;
    payload: IHideViewPayload;
}

export interface IHideViewPayload {
    view: ViewType;
}

export function hideView(view: ViewType): IHideViewAction {
    return {
        payload: {
            view,
        },
        type: HIDE_VIEW,
    };
}

// toggle view

export type TOGGLE_VIEW = 'settings/TOGGLE_VIEW';
export const TOGGLE_VIEW: TOGGLE_VIEW = 'settings/TOGGLE_VIEW';

export interface IToggleViewAction extends Action {
    type: TOGGLE_VIEW;
    payload: IToggleViewPayload;
}

export interface IToggleViewPayload {
    view: ViewType;
}

export function toggleView(view: ViewType): IToggleViewAction {
    return {
        payload: {
            view,
        },
        type: TOGGLE_VIEW,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ViewsAction = IShowViewAction |
    IHideViewAction |
    IToggleViewAction |
    IOtherAction;
