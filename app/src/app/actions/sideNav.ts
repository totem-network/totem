import { Action } from 'redux';

// Show side nav

export type SHOW_SIDE_NAV = 'app/SHOW_SIDE_NAV';
export const SHOW_SIDE_NAV: SHOW_SIDE_NAV = 'app/SHOW_SIDE_NAV';

export interface IShowSideNavAction extends Action {
    type: SHOW_SIDE_NAV;
    payload: IShowSideNavPayload;
}

export interface IShowSideNavPayload {}

export function showSideNav(): IShowSideNavAction {
    return {
        payload: {},
        type: SHOW_SIDE_NAV,
    };
}

// Hide side nav

export type HIDE_SIDE_NAV = 'app/HIDE_SIDE_NAV';
export const HIDE_SIDE_NAV: HIDE_SIDE_NAV = 'app/HIDE_SIDE_NAV';

export interface IHideSideNavAction extends Action {
    type: HIDE_SIDE_NAV;
    payload: IHideSideNavPayload;
}

export interface IHideSideNavPayload {}

export function hideSideNav(): IHideSideNavAction {
    return {
        payload: {},
        type: HIDE_SIDE_NAV,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type NavAction = IShowSideNavAction |
        IHideSideNavAction |
        IOtherAction;
