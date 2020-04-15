import { fromJS } from 'immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import {
    CurrentNetworkAction,
    SET_CURRENT_NETWORK,
} from '../../actions/blockchain/currentNetwork';

interface ICurrentNetworkState {
    coinType?: string;
    chainId: any;
    name: string;
}

export interface IImmutableCurrentNetworkState extends IImmutableStateMap<ICurrentNetworkState> {}

const initialState = fromJS({});

function currentNetworkReducer(
    state: IImmutableCurrentNetworkState = initialState,
    action: CurrentNetworkAction,
): IImmutableCurrentNetworkState {

    switch (action.type) {
        case SET_CURRENT_NETWORK:
            return fromJS({
                ...action.payload,
            });
    }

    return state;
}

export default currentNetworkReducer;
