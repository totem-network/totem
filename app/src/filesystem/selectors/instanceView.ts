import { createSelector } from 'reselect';

const viewSelector = (state: any, instance: string) => {
    return state.get('filesystem').get('views').get(instance);
};

export default createSelector(
    viewSelector,
    (view) => view,
);
