import { createSelector } from 'reselect';
import { IImmutableState } from './../../reducers';

const loggedInSelector = (state: IImmutableState) => state.get('account').toJS();

export default createSelector(
    loggedInSelector,
    (account) => {
        return account.address ? true : false;
    },
);
