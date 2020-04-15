// ipfs or swarm
import { combineReducers } from 'redux-immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import currentNetworkReducer, { IImmutableCurrentNetworkState } from './currentNetwork';

interface IStorageState {
    currentNetwork: IImmutableCurrentNetworkState;
}

export interface IImmutableStorageState extends IImmutableStateMap<IStorageState> {}

export default combineReducers({
    currentNetwork: currentNetworkReducer,
});
