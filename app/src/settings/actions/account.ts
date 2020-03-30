import { Action } from 'redux';

// reset account

export type RESET_ACCOUNT = 'settings/RESET_ACCOUNT';
export const RESET_ACCOUNT: RESET_ACCOUNT = 'settings/RESET_ACCOUNT';

export interface IResetAccountAction extends Action {
    type: RESET_ACCOUNT;
    payload: IResetAccountPayload;
}

export interface IResetAccountPayload {}

export function resetAccount(): IResetAccountAction {
    return {
        payload: {},
        type: RESET_ACCOUNT,
    };
}

// account reset

export type ACCOUNT_RESET = 'settings/ACCOUNT_RESET';
export const ACCOUNT_RESET: ACCOUNT_RESET = 'settings/ACCOUNT_RESET';

export interface IAccountResetAction extends Action {
    type: ACCOUNT_RESET;
    payload: IAccountResetPayload;
}

export interface IAccountResetPayload {}

export function accountReset(): IAccountResetAction {
    return {
        payload: {},
        type: ACCOUNT_RESET,
    };
}

// show reset account modal

export type SHOW_RESET_ACCOUNT_MODAL = 'settings/SHOW_RESET_ACCOUNT_MODAL';
export const SHOW_RESET_ACCOUNT_MODAL: SHOW_RESET_ACCOUNT_MODAL = 'settings/SHOW_RESET_ACCOUNT_MODAL';

export interface IShowResetAccountModalAction extends Action {
    type: SHOW_RESET_ACCOUNT_MODAL;
    payload: IShowResetAccountModalPayload;
}

export interface IShowResetAccountModalPayload {}

export function showResetAccountModal(): IShowResetAccountModalAction {
    return {
        payload: {},
        type: SHOW_RESET_ACCOUNT_MODAL,
    };
}

// show reset account modal

export type HIDE_RESET_ACCOUNT_MODAL = 'settings/HIDE_RESET_ACCOUNT_MODAL';
export const HIDE_RESET_ACCOUNT_MODAL: HIDE_RESET_ACCOUNT_MODAL = 'settings/HIDE_RESET_ACCOUNT_MODAL';

export interface IHideResetAccountModalAction extends Action {
    type: HIDE_RESET_ACCOUNT_MODAL;
    payload: IHideResetAccountModalPayload;
}

export interface IHideResetAccountModalPayload {}

export function hideResetAccountModal(): IHideResetAccountModalAction {
    return {
        payload: {},
        type: HIDE_RESET_ACCOUNT_MODAL,
    };
}

// reset settings

export type RESET_SETTINGS = 'settings/RESET_SETTINGS';
export const RESET_SETTINGS: RESET_SETTINGS = 'settings/RESET_SETTINGS';

export interface IResetSettingsAction extends Action {
    type: RESET_SETTINGS;
    payload: IResetSettingsPayload;
}

export interface IResetSettingsPayload {}

export function resetSettings(): IResetSettingsAction {
    return {
        payload: {},
        type: RESET_SETTINGS,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type AccountAction = IResetAccountAction |
    IAccountResetAction |
    IResetSettingsAction |
    IOtherAction;
