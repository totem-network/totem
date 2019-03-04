import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const web3InitializedSelector = (state: IImmutableState) => state.get('app').get('initialized').toJS();

export default createSelector(
    web3InitializedSelector,
    (initialized) => {
        return initialized.web3;
    },
);
