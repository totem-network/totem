import { createSelector } from 'reselect';
import { IImmutableState } from './../../reducers';

const accountSelector = (state: IImmutableState) => state.get('account').toJS();

export default createSelector(
    accountSelector,
    (account) => {
        return {
            address: account.address,
        };
    },
);
