import { Action } from 'redux';

// start application

export type START_APPLICATION = 'applications/START_APPLICATION';
export const START_APPLICATION: START_APPLICATION = 'applications/START_APPLICATION';

export interface IStartApplicationAction extends Action {
    type: START_APPLICATION;
    payload: IStartApplicationPayload;
}

export interface IStartApplicationPayload {
    application: string;
}

export function startApplication(application: string): IStartApplicationAction {
    return {
        payload: {
            application,
        },
        type: START_APPLICATION,
    };
}

// close a Application

export type CLOSE_APPLICATION = 'applications/CLOSE_APPLICATION';
export const CLOSE_APPLICATION: CLOSE_APPLICATION = 'applications/CLOSE_APPLICATION';

export interface ICloseApplicationAction extends Action {
    type: CLOSE_APPLICATION;
    payload: ICloseApplicationPayload;
}

export interface ICloseApplicationPayload {
    instance: string;
}

export function closeApplication(
    instance: string,
): ICloseApplicationAction {
    return {
        payload: {
            instance,
        },
        type: CLOSE_APPLICATION,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ApplicationAction = IStartApplicationAction |
        IOtherAction;
