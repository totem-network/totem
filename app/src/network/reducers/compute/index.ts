// golem or iexec
import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';

interface IComputeState {
}

export interface IImmutableComputeState extends IImmutableStateMap<IComputeState> {}

export default combineReducers({
});
