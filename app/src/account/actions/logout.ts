import { Action } from 'redux';

// logout

export type LOGOUT = 'account/LOGOUT';
export const LOGOUT: LOGOUT = 'account/LOGOUT';

export interface ILogoutAction extends Action {
    type: LOGOUT;
    payload: ILogoutPayload;
}

export interface ILogoutPayload {}

export function logout(): ILogoutAction {
    return {
        payload: {},
        type: LOGOUT,
    };
}

// logout success

export type LOGOUT_SUCCESS = 'account/LOGOUT_SUCCESS';
export const LOGOUT_SUCCESS: LOGOUT_SUCCESS = 'account/LOGOUT_SUCCESS';

export interface ILogoutSuccessAction extends Action {
    type: LOGOUT_SUCCESS;
    payload: ILogoutSuccessPayload;
}

export interface ILogoutSuccessPayload {}

export function logoutSuccess(): ILogoutSuccessAction {
    return {
        payload: {},
        type: LOGOUT_SUCCESS,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type LogoutAction = ILogoutAction |
        ILogoutSuccessAction |
        IOtherAction;
