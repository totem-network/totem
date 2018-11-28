import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import instancesReducer, { IImmutableInstancesState } from './instances';
import launcherReducer, { IImmutableLauncherState } from './launcher';
import taskManagerReducer, { IImmutableTaskManagerState } from './taskManager';
import windowsReducer, { IImmutableWindowsState } from './windows';

interface IApplicationsState {
    instances: IImmutableInstancesState;
    launcher: IImmutableLauncherState;
    taskManager: IImmutableTaskManagerState;
    windows: IImmutableWindowsState;
}

export interface IImmutableApplicationsState extends IImmutableStateMap<IApplicationsState> {}

export default combineReducers({
    instances: instancesReducer,
    launcher: launcherReducer,
    taskManager: taskManagerReducer,
    windows: windowsReducer,
});
