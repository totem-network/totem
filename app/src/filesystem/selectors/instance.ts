import { createSelector } from 'reselect';

const instanceSelector = (state: any, id: string) => {
    return state.get('filesystem').get('instances').get(id);
};

export default createSelector(
    instanceSelector,
    (instance) => instance,
);
