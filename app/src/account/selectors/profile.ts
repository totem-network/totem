import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const profileSelector = (state: IImmutableState, address: string) => {
    return state.get('account').get('profile').get(address);
};

export default createSelector(
    profileSelector,
    (profile) => {
        return profile;
    },
);
