import { Action } from 'redux';

// show side nav

export type SHOW_SIDE_NAV = 'filesystem/SHOW_SIDE_NAV';
export const SHOW_SIDE_NAV: SHOW_SIDE_NAV = 'filesystem/SHOW_SIDE_NAV';

export interface IShowSideNavAction extends Action {
    type: SHOW_SIDE_NAV;
    payload: IShowSideNavPayload;
}

export interface IShowSideNavPayload {
    instance: string;
}

export function showSideNav(
    instance: string,
): IShowSideNavAction {
    return {
        payload: {
            instance,
        },
        type: SHOW_SIDE_NAV,
    };
}

// close a Instance

export type HIDE_SIDE_NAV = 'filesystem/HIDE_SIDE_NAV';
export const HIDE_SIDE_NAV: HIDE_SIDE_NAV = 'filesystem/HIDE_SIDE_NAV';

export interface IHideSideNavAction extends Action {
    type: HIDE_SIDE_NAV;
    payload: IHideSideNavPayload;
}

export interface IHideSideNavPayload {
    instance: string;
}

export function hideSideNav(
    instance: string,
): IHideSideNavAction {
    return {
        payload: {
            instance,
        },
        type: HIDE_SIDE_NAV,
    };
}

// select category

export type SELECT_CATEGORY = 'filesystem/SELECT_CATEGORY';
export const SELECT_CATEGORY: SELECT_CATEGORY = 'filesystem/SELECT_CATEGORY';

export interface ISelectCategoryAction extends Action {
    type: SELECT_CATEGORY;
    payload: ISelectCategoryPayload;
}

export interface ISelectCategoryPayload {
    category: string;
    instance: string;
}

export function selectCategory(
    instance: string,
    category: string,
): ISelectCategoryAction {
    return {
        payload: {
            category,
            instance,
        },
        type: SELECT_CATEGORY,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type InstancesAction = IShowSideNavAction |
        IHideSideNavAction |
        ISelectCategoryAction |
        IOtherAction;
