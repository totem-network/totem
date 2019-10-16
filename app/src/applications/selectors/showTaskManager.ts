import { createSelector } from 'reselect';

const taskManagerSelector = (state: any) => {
    return state.get('applications').get('taskManager').get('showTaskManager');
};

export default createSelector(
    taskManagerSelector,
    (taskManager) => taskManager,
);
