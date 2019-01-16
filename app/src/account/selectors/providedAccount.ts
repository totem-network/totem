import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const providedAccountSelector = (state: IImmutableState) => {
    return state.get('account').get('providedAccounts').get(0);
};

export default createSelector(
    providedAccountSelector,
    (account) => {
        return account;
    },
);
