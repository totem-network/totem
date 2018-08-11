import { createSelector } from 'reselect';

const routerSelector = (state: any) => state.get('app').get('routing').toJS();

export default createSelector(
    routerSelector,
    (routingState) => routingState,
);
