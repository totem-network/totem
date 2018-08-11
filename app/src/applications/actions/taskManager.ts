import { Action } from 'redux';

// Show task manager

export type SHOW_TASK_MANAGER = 'applications/SHOW_TASK_MANAGER';
export const SHOW_TASK_MANAGER: SHOW_TASK_MANAGER = 'applications/SHOW_TASK_MANAGER';

export interface IShowTaskManagerAction extends Action {
    type: SHOW_TASK_MANAGER;
    payload: IShowTaskManagerPayload;
}

export interface IShowTaskManagerPayload {}

export function showTaskManager(): IShowTaskManagerAction {
    return {
        payload: {},
        type: SHOW_TASK_MANAGER,
    };
}

// Hide task manager

export type HIDE_TASK_MANAGER = 'applications/HIDE_TASK_MANAGER';
export const HIDE_TASK_MANAGER: HIDE_TASK_MANAGER = 'applications/HIDE_TASK_MANAGER';

export interface IHideTaskManagerAction extends Action {
    type: HIDE_TASK_MANAGER;
    payload: IHideTaskManagerPayload;
}

export interface IHideTaskManagerPayload {}

export function hideTaskManager(): IHideTaskManagerAction {
    return {
        payload: {},
        type: HIDE_TASK_MANAGER,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type TaskManagerAction = IShowTaskManagerAction |
        IHideTaskManagerAction |
        IOtherAction;
