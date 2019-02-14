import { createSelector } from 'reselect';
import instanceSelector from './instance';

export default createSelector(
    instanceSelector,
    (instance) => {
        return instance.showSideNav;
    },
);
