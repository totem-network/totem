import { createSelector } from 'reselect';

const taskManagerSelector = (state: any) => {
    return state.get('applications').get('taskManager').toJS();
};

export default createSelector(
    taskManagerSelector,
    (taskManager) => taskManager,
);
