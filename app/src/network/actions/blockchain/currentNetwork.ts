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
    chainId: string;
    name: string;
}

export function setCurrentNetwork(
    chainId: string,
    name: string,
): ISetCurrentNetworkAction {
    return {
        payload: {
            chainId,
            name,
        },
        type: SET_CURRENT_NETWORK,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type CurrentNetworkAction = ISetCurrentNetworkAction |
    IOtherAction;
