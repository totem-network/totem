import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import addressReducer, { IImmutableAddressState } from './address';
import domainsReducer, { IImmutableDomainsState } from './domains';
import profilesReducer, { IImmutableProfilesState } from './profiles';
import providedAccountsReducer, { IImmutableProvidedAccountsState } from './providedAccounts';

interface IAccountState {
    address: IImmutableAddressState;
    domains: IImmutableDomainsState;
    profiles: IImmutableProfilesState;
    providedAccounts: IImmutableProvidedAccountsState;
}

export interface IImmutableAccountState extends IImmutableStateMap<IAccountState> {}

export default combineReducers({
    address: addressReducer,
    domains: domainsReducer,
    profiles: profilesReducer,
    providedAccounts: providedAccountsReducer,
});
