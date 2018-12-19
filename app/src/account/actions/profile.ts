import { Action } from 'redux';

// add profile

export type ADD_PROFILE = 'account/ADD_PROFILE';
export const ADD_PROFILE: ADD_PROFILE = 'account/ADD_PROFILE';

export interface IAddProfileAction extends Action {
    type: ADD_PROFILE;
    payload: IAddProfilePayload;
}

export interface IAddProfilePayload {
    address: string;
    image?: string;
    name?: string;
}

export function addProfile(
    address: string,
    image?: string,
    name?: string,
): IAddProfileAction {
    return {
        payload: {
            address,
            image,
            name,
        },
        type: ADD_PROFILE,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ProfileAction = IAddProfileAction |
        IOtherAction;
