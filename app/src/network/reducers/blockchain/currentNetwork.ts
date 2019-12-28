import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import {
    CurrentNetworkAction,
    SET_CURRENT_NETWORK,
} from '../../actions/blockchain/currentNetwork';

interface ICurrentNetworkState {
    coinType?: string;
}

export interface IImmutableCurrentNetworkState extends IImmutableStateMap<ICurrentNetworkState> {}

const initialState = fromJS({});

function currentNetworkReducer(
    state: IImmutableCurrentNetworkState = initialState,
    action: CurrentNetworkAction,
): IImmutableCurrentNetworkState {

    switch (action.type) {
        case SET_CURRENT_NETWORK:
            return state.set('coinType', action.payload.coinType);
    }

    return state;
}

export default currentNetworkReducer;
