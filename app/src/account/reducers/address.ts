import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import {
    LOGIN_SUCCESS,
    LoginAction,
} from '../actions/login';
import {
    LOGOUT_SUCCESS,
    LogoutAction,
} from '../actions/logout';

interface IAddressState {
    account: string | null;
}

export interface IImmutableAddressState extends IImmutableStateMap<IAddressState> {}

const initialState = fromJS({
    account: null,
});

function addressReducer(
    state: IImmutableAddressState = initialState,
    action: LoginAction | LogoutAction,
): IImmutableAddressState {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return state.set('account', action.payload.address);
        case LOGOUT_SUCCESS:
            return state.set('account', null);
    }

    return state;
}

export default addressReducer;
