import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import {
    CurrentNetworkAction,
    SET_CURRENT_NETWORK,
} from '../../actions/blockchain/currentNetwork';

interface INavState {
    network?: string;
    platform?: string;
}

export interface IImmutableCurrentNetworkState extends IImmutableStateMap<INavState> {}

const initialState = fromJS({});

function currentNetworkReducer(
    state: IImmutableCurrentNetworkState = initialState,
    action: CurrentNetworkAction,
): IImmutableCurrentNetworkState {

    switch (action.type) {
        case SET_CURRENT_NETWORK:
            return state.set('network', action.payload.network)
                .set('platform', action.payload.platform);
    }

    return state;
}

export default currentNetworkReducer;
