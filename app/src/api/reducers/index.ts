import { combineReducers } from 'redux-immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import initializedReducer, { IImmutableInitializedState } from './initialized';

interface IApiState {
    initialized: IImmutableInitializedState;
}

export interface IImmutableApiState extends IImmutableStateMap<IApiState> {}

export default combineReducers({
    initialized: initializedReducer,
});
