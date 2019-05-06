import { Action } from 'redux';

// change locale

export type CHANGE_LOCALE = 'CHANGE_LOCALE';
export const CHANGE_LOCALE: CHANGE_LOCALE = 'CHANGE_LOCALE';

export interface IChangeLocaleAction extends Action {
    type: CHANGE_LOCALE;
    payload: IChangeLocalePayload;
}

export interface IChangeLocalePayload {
    locale: string;
}

export function changeLocale(locale: string): IChangeLocaleAction {
    return {
        payload: {
            locale,
        },
        type: CHANGE_LOCALE,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type IntlAction = IChangeLocaleAction |
        IOtherAction;
