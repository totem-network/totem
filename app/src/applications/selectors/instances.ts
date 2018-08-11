import { createSelector } from 'reselect';

const instancesSelector = (state: any) => state.get('applications').get('instances').toJS();

export default createSelector(
    instancesSelector,
    (instances) => instances,
);
