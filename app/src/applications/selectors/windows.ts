import { createSelector } from 'reselect';

const windowsSelector = (state: any) => state.get('applications').get('windows').toJS();

export default createSelector(
    windowsSelector,
    (windows) => windows,
);
