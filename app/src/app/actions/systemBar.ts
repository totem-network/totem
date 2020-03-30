import { Action } from 'redux';

// Show system bar drawer

export type DrawerView = 'default' | 'settings';

export type SHOW_SYSTEM_BAR_DRAWER = 'app/SHOW_SYSTEM_BAR_DRAWER';
export const SHOW_SYSTEM_BAR_DRAWER: SHOW_SYSTEM_BAR_DRAWER = 'app/SHOW_SYSTEM_BAR_DRAWER';

export interface IShowSystemBarDrawerAction extends Action {
    type: SHOW_SYSTEM_BAR_DRAWER;
    payload: IShowSystemBarDrawerPayload;
}

export interface IShowSystemBarDrawerPayload {
    drawerView: DrawerView;
}

export function showSystemBarDrawer(drawerView?: DrawerView): IShowSystemBarDrawerAction {
    if (!drawerView) {
        drawerView = 'default';
    }

    return {
        payload: {
            drawerView,
        },
        type: SHOW_SYSTEM_BAR_DRAWER,
    };
}

// Hide system bar drawer

export type HIDE_SYSTEM_BAR_DRAWER = 'app/HIDE_SYSTEM_BAR_DRAWER';
export const HIDE_SYSTEM_BAR_DRAWER: HIDE_SYSTEM_BAR_DRAWER = 'app/HIDE_SYSTEM_BAR_DRAWER';

export interface IHideSystemBarDrawerAction extends Action {
    type: HIDE_SYSTEM_BAR_DRAWER;
    payload: IHideSystemBarDrawerPayload;
}

export interface IHideSystemBarDrawerPayload {}

export function hideSystemBarDrawer(): IHideSystemBarDrawerAction {
    return {
        payload: {},
        type: HIDE_SYSTEM_BAR_DRAWER,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type SystemBarAction = IShowSystemBarDrawerAction |
    IHideSystemBarDrawerAction |
    IOtherAction;
