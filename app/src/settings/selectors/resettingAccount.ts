import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const resettingAccountSelector = (state: IImmutableState) => state.get('settings').get('account').toJS();

export default createSelector(
    resettingAccountSelector,
    (account) => {
        return account.resettingAccount;
    },
);
