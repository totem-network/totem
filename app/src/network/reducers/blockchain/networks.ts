import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import { AccountsAction } from '../../actions/blockchain/accounts';

interface INetwork {
    platform: string;
    network: string;
    // config: INetworkConfig;
    // ...
}

// TODO: or List?
interface INetworksState {
    [key: string]: INetwork;
}

export interface IImmutableNetworksState extends IImmutableStateMap<INetworksState> {}

const initialState = fromJS({});

function networksReducer(
    state: IImmutableNetworksState = initialState,
    action: AccountsAction,
): IImmutableNetworksState {

    switch (action.type) {
    }

    return state;
}

export default networksReducer;
