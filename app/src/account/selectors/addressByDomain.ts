import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const addressByDomainSelector = (state: IImmutableState, domain: string) => {
    return state.get('account').get('domains').get(domain);
};

export default createSelector(
    addressByDomainSelector,
    (address) => {
        return address;
    },
);
