import { Action } from 'redux';

// set current network

export type SET_CURRENT_NETWORK = 'network/blockchain/SET_CURRENT_NETWORK';
export const SET_CURRENT_NETWORK: SET_CURRENT_NETWORK = 'network/blockchain/SET_CURRENT_NETWORK';

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
    network: string,
    platform: string,
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
