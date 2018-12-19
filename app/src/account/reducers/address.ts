import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import {
    LOGIN_SUCCESS,
    LoginAction,
} from '../actions/login';
// TODO: AddressAction, ADD_ADDRESS

interface IAddressState {
    account: string | null;
    // device: string | null;
    // TODO: proxies for dapps, wallets?
}

export interface IImmutableAddressState extends IImmutableStateMap<IAddressState> {}

const initialState = fromJS({
    account: null,
});

function addressReducer(
    state: IImmutableAddressState = initialState,
    action: LoginAction,
): IImmutableAddressState {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return state.set('account', action.payload.address);
    }

    return state;
}

export default addressReducer;
