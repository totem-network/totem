// whisper or matrix
import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';

interface IMessageState {
}

export interface IImmutableMessageState extends IImmutableStateMap<IMessageState> {}

export default combineReducers({
});
