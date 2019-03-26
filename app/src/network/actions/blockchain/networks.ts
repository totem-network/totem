import { Action } from 'redux';

// add network

export type ADD_NETWORK = 'network/blockchain/ADD_NETWORK';
export const ADD_NETWORK: ADD_NETWORK = 'network/blockchain/ADD_NETWORK';

export interface IAddNetworkAction extends Action {
    type: ADD_NETWORK;
    payload: IAddNetworkPayload;
}

export interface INetworkConfig {
    method: string;
}

export interface IAddNetworkPayload {
    platform: string;
    network: string;
}

export function addNetwork(platform: string, network: string): IAddNetworkAction {
    return {
        payload: {
            network,
            platform,
        },
        type: ADD_NETWORK,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type NetworksAction = IAddNetworkAction |
    IOtherAction;
