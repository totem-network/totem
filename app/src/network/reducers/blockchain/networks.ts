import { fromJS, Map } from 'immutable';
import { AccountsAction } from '../../actions/blockchain/accounts';

interface INetwork {
    platform: string;
    network: string;
    // config: INetworkConfig;
    // ...
}

export interface IImmutableNetworksState extends Map<string, INetwork> {}

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
