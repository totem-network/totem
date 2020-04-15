import { Action } from 'redux';

export interface INotificationAction {
    action: string;
    icon?: string;
    title: string;
}

export interface INotification {
    actions?: INotificationAction[];
    application: string;
    badge?: string;
    body?: string;
    data?: any;
    direction?: 'ltr' | 'rtl';
    expires?: number;
    language?: string;
    tag?: string;
    icon?: string;
    id: string;
    image?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    themeColor?: string;
    timestamp: number;
    title: string;
    vibrate?: number[];
}

// add a notification

export type ADD_NOTIFICATION = 'notifications/ADD_NOTIFICATION';
export const ADD_NOTIFICATION: ADD_NOTIFICATION = 'notifications/ADD_NOTIFICATION';

export interface IAddNotificationAction extends Action {
    type: ADD_NOTIFICATION;
    payload: IAddNotificationPayload;
}

export interface IAddNotificationPayload {
    notification: INotification;
}

export function addNotification(notification: INotification): IAddNotificationAction {
    return {
        payload: {
            notification,
        },
        type: ADD_NOTIFICATION,
    };
}

// close a notification

export type CLOSE_NOTIFICATION = 'notifications/CLOSE_NOTIFICATION';
export const CLOSE_NOTIFICATION: CLOSE_NOTIFICATION = 'notifications/CLOSE_NOTIFICATION';

export interface ICloseNotificationAction extends Action {
    type: CLOSE_NOTIFICATION;
    payload: ICloseNotificationPayload;
}

export interface ICloseNotificationPayload {
    id: string;
}

export function closeNotification(
    id: string,
): ICloseNotificationAction {
    return {
        payload: {
            id,
        },
        type: CLOSE_NOTIFICATION,
    };
}

// update a notification

export type UPDATE_NOTIFICATION = 'notifications/UPDATE_NOTIFICATION';
export const UPDATE_NOTIFICATION: UPDATE_NOTIFICATION = 'notifications/UPDATE_NOTIFICATION';

export interface IUpdateNotificationAction extends Action {
    type: UPDATE_NOTIFICATION;
    payload: IUpdateNotificationPayload;
}

export interface IUpdateNotificationPayload {
    id: string;
}

export function updateNotification(
    id: string,
): IUpdateNotificationAction {
    return {
        payload: {
            id,
        },
        type: UPDATE_NOTIFICATION,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type NotificationsAction = IAddNotificationAction |
        ICloseNotificationAction |
        IUpdateNotificationAction |
        IOtherAction;
