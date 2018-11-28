import { Action } from 'redux';

// Show launcher

export type SHOW_LAUNCHER = 'applications/SHOW_LAUNCHER';
export const SHOW_LAUNCHER: SHOW_LAUNCHER = 'applications/SHOW_LAUNCHER';

export interface IShowLauncherAction extends Action {
    type: SHOW_LAUNCHER;
    payload: IShowLauncherPayload;
}

export interface IShowLauncherPayload {}

export function showLauncher(): IShowLauncherAction {
    return {
        payload: {},
        type: SHOW_LAUNCHER,
    };
}

// Hide launcher

export type HIDE_LAUNCHER = 'applications/HIDE_LAUNCHER';
export const HIDE_LAUNCHER: HIDE_LAUNCHER = 'applications/HIDE_LAUNCHER';

export interface IHideLauncherAction extends Action {
    type: HIDE_LAUNCHER;
    payload: IHideLauncherPayload;
}

export interface IHideLauncherPayload {}

export function hideLauncher(): IHideLauncherAction {
    return {
        payload: {},
        type: HIDE_LAUNCHER,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type LauncherAction = IShowLauncherAction |
        IHideLauncherAction |
        IOtherAction;
