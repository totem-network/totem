import { Action } from 'redux';

// Show launch bar

export type SHOW_LAUNCH_BAR = 'app/SHOW_LAUNCH_BAR';
export const SHOW_LAUNCH_BAR: SHOW_LAUNCH_BAR = 'app/SHOW_LAUNCH_BAR';

export interface IShowLaunchBarAction extends Action {
    type: SHOW_LAUNCH_BAR;
    payload: IShowLaunchBarPayload;
}

export interface IShowLaunchBarPayload {}

export function showLaunchBar(): IShowLaunchBarAction {
    return {
        payload: {},
        type: SHOW_LAUNCH_BAR,
    };
}

// Hide launch bar

export type HIDE_LAUNCH_BAR = 'app/HIDE_LAUNCH_BAR';
export const HIDE_LAUNCH_BAR: HIDE_LAUNCH_BAR = 'app/HIDE_LAUNCH_BAR';

export interface IHideLaunchBarAction extends Action {
    type: HIDE_LAUNCH_BAR;
    payload: IHideLaunchBarPayload;
}

export interface IHideLaunchBarPayload {}

export function hideLaunchBar(): IHideLaunchBarAction {
    return {
        payload: {},
        type: HIDE_LAUNCH_BAR,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type LaunchBarAction = IShowLaunchBarAction |
        IHideLaunchBarAction |
        IOtherAction;
