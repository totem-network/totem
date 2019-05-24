import { createSelector } from 'reselect';

const instancesSelector = (state: any) => {
    return state.get('filesystem').get('instances').toJS();
};

export default createSelector(
    instancesSelector,
    (instances) => instances,
);
