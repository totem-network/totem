import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import addressReducer, { IImmutableAddressState } from './address';
import loginReducer, { IImmutableLoginState } from './login';
import providedAccountsReducer, { IImmutableProvidedAccountsState } from './providedAccounts';

interface IAccountState {
    address: IImmutableAddressState;
    login: IImmutableLoginState;
    providedAccounts: IImmutableProvidedAccountsState;
}

export interface IImmutableAccountState extends IImmutableStateMap<IAccountState> {}

export default combineReducers({
    address: addressReducer,
    login: loginReducer,
    providedAccounts: providedAccountsReducer,
});
