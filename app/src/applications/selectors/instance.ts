import { createSelector } from 'reselect';

const instanceSelector = (state: any, id: string) => {
    return state.get('applications').get('instances').find((instance: any) => {
        return (instance.id === id);
    });
};

export default createSelector(
    instanceSelector,
    (instance) => instance,
);
