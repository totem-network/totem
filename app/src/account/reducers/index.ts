import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import addressReducer, { IImmutableAddressState } from './address';
import providedAccountsReducer, { IImmutableProvidedAccountsState } from './providedAccounts';

interface IAccountState {
    address: IImmutableAddressState;
    providedAccounts: IImmutableProvidedAccountsState;
}

export interface IImmutableAccountState extends IImmutableStateMap<IAccountState> {}

export default combineReducers({
    address: addressReducer,
    providedAccounts: providedAccountsReducer,
});
