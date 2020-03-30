import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const resetAccountModalSelector = (state: IImmutableState) => state.get('settings').get('account').toJS();

export default createSelector(
    resetAccountModalSelector,
    (account) => {
        return account.resetAccountModal;
    },
);
