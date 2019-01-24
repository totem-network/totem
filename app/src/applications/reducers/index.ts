import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import instancesReducer, { IImmutableInstancesState } from './instances';
import taskManagerReducer, { IImmutableTaskManagerState } from './taskManager';
import windowsReducer, { IImmutableWindowsState } from './windows';

interface IApplicationsState {
    instances: IImmutableInstancesState;
    taskManager: IImmutableTaskManagerState;
    windows: IImmutableWindowsState;
}

export interface IImmutableApplicationsState extends IImmutableStateMap<IApplicationsState> {}

export default combineReducers({
    instances: instancesReducer,
    taskManager: taskManagerReducer,
    windows: windowsReducer,
});
