import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const loggedInSelector = (state: IImmutableState) => {
    return state.get('account').get('address').get('account');
};

export default createSelector(
    loggedInSelector,
    (account) => {
        return account ? true : false;
    },
);
