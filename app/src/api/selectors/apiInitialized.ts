import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const apiInitializedSelector = (state: IImmutableState) => state.get('api').get('initialized').toJS();

export default createSelector(
    apiInitializedSelector,
    (initialized) => {
        return initialized.api;
    },
);
