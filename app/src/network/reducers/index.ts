import { combineReducers } from 'redux-immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import blockchainReducer, { IImmutableBlockchainState } from './blockchain';
import computeReducer, { IImmutableComputeState } from './compute';
import messageReducer, { IImmutableMessageState } from './message';
import storageReducer, { IImmutableStorageState } from './storage';

interface INetworkState {
    blockchain: IImmutableBlockchainState;
    // compute: IImmutableComputeState;
    // message: IImmutableMessageState;
    // storage: IImmutableStorageState;
}

export interface IImmutableNetworkState extends IImmutableStateMap<INetworkState> {}

export default combineReducers({
    blockchain: blockchainReducer,
    // compute: computeReducer,
    // message: messageReducer,
    // storage: storageReducer,
});
