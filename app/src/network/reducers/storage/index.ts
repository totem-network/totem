// ipfs or swarm
import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';

interface IStorageState {
}

export interface IImmutableStorageState extends IImmutableStateMap<IStorageState> {}

export default combineReducers({
});
