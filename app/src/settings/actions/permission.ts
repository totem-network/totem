import { Action } from 'redux';

// reset account

export type TOGGLE_PERMISSION = 'settings/TOGGLE_PERMISSION';
export const TOGGLE_PERMISSION: TOGGLE_PERMISSION = 'settings/TOGGLE_PERMISSION';

export interface ITogglePermissionAction extends Action {
    type: TOGGLE_PERMISSION;
    payload: ITogglePermissionPayload;
}

export interface ITogglePermissionPayload {}

export function togglePermission(): ITogglePermissionAction {
    return {
        payload: {},
        type: TOGGLE_PERMISSION,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type AccountAction = ITogglePermissionAction |
    IOtherAction;
