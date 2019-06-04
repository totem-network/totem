import { Action } from 'redux';

// select view

export type SELECT_VIEW = 'filesystem/SELECT_VIEW';
export const SELECT_VIEW: SELECT_VIEW = 'filesystem/SELECT_VIEW';

export interface ISelectViewAction extends Action {
    type: SELECT_VIEW;
    payload: ISelectViewPayload;
}

export interface ISelectViewPayload {
    instance: string;
    view: string;
}

export function selectView(
    instance: string,
    view: string,
): ISelectViewAction {
    return {
        payload: {
            instance,
            view,
        },
        type: SELECT_VIEW,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ViewsAction = ISelectViewAction |
        IOtherAction;
