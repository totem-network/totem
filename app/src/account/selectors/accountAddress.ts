import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const accountAddressSelector = (state: IImmutableState) => {
    return state.get('account').get('address').get('account');
};

export default createSelector(
    accountAddressSelector,
    (account) => {
        return account;
    },
);
