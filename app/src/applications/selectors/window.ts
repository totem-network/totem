import { createSelector } from 'reselect';

const windowSelector = (state: any, instance: string) => {
    return state.get('applications').get('windows').find((window: any) => {
        return (window.instance === instance);
    });
};

export default createSelector(
    windowSelector,
    (window) => window,
);
