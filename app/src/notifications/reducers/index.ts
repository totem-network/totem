import { combineReducers } from 'redux-immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import queueReducer, { IImmutableQueueState } from './queue';

interface INotificationsState {
    queue: IImmutableQueueState;
}

export interface IImmutableNotificationsState extends IImmutableStateMap<INotificationsState> {}

export default combineReducers({
    queue: queueReducer,
});
