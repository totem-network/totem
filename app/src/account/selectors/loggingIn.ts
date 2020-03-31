import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const loggingInSelector = (state: IImmutableState) => {
    return state.get('account').get('login').get('loggingIn');
};

export default createSelector(
    loggingInSelector,
    (loggingIn) => {
        return loggingIn;
    },
);
