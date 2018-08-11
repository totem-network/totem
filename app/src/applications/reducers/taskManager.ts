import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import { HIDE_TASK_MANAGER, SHOW_TASK_MANAGER, TaskManagerAction } from './../actions/taskManager';

interface ITaskManagerState {
    showTaskManager: boolean;
}

export interface IImmutableTaskManagerState extends IImmutableStateMap<ITaskManagerState> {}

const initialState = fromJS({
    showTaskManager: false,
});

function taskManagerReducer(
    state: IImmutableTaskManagerState = initialState,
    action: TaskManagerAction,
): IImmutableTaskManagerState {

    switch (action.type) {
        case SHOW_TASK_MANAGER:
            return state.set('showTaskManager', true);
        case HIDE_TASK_MANAGER:
            return state.set('showTaskManager', false);
    }

    return state;
}

export default taskManagerReducer;
