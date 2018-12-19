import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import addressReducer, { IImmutableAddressState } from './address';
import profileReducer, { IImmutableProfileState } from './profile';
import providedAccountsReducer, { IImmutableProvidedAccountsState } from './providedAccounts';

interface IAccountState {
    address: IImmutableAddressState;
    profile: IImmutableProfileState;
    providedAccounts: IImmutableProvidedAccountsState;
}

export interface IImmutableAccountState extends IImmutableStateMap<IAccountState> {}

export default combineReducers({
    address: addressReducer,
    profile: profileReducer,
    providedAccounts: providedAccountsReducer,
});
