import { Action } from 'redux';

// set current network

export type SET_CURRENT_NETWORK = 'network/storage/SET_CURRENT_NETWORK';
export const SET_CURRENT_NETWORK: SET_CURRENT_NETWORK = 'network/storage/SET_CURRENT_NETWORK';

export interface ISetCurrentNetworkAction extends Action {
    type: SET_CURRENT_NETWORK;
    payload: ISetCurrentNetworkPayload;
}

export interface ICurrentNetworkConfig {
    method: string;
}

export interface ISetCurrentNetworkPayload {
    network: string;
    platform: string;
}

export function setCurrentNetwork(
    platform: string,
    network: string,
): ISetCurrentNetworkAction {
    return {
        payload: {
            network,
            platform,
        },
        type: SET_CURRENT_NETWORK,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type CurrentNetworkAction = ISetCurrentNetworkAction |
    IOtherAction;
