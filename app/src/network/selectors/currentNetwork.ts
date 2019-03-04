import { createSelector } from 'reselect';

const currentNetworkSelector = (state: any) => {
    return state.get('network').get('blockchain').get('currentNetwork').toJS();
};

export default createSelector(
    currentNetworkSelector,
    (currentNetwork) => currentNetwork,
);
