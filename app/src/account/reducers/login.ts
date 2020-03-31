import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import {
    LOGIN_METAMASK,
    LOGIN_PRIVATE_KEY,
    LOGIN_SUCCESS,
    LoginAction,
} from '../actions/login';

interface ILoginState {
    loggingIn: boolean;
}

export interface IImmutableLoginState extends IImmutableStateMap<ILoginState> {}

const initialState = fromJS({
    loggingIn: false,
});

function loginReducer(
    state: IImmutableLoginState = initialState,
    action: LoginAction,
): IImmutableLoginState {

    switch (action.type) {
        case LOGIN_PRIVATE_KEY:
        case LOGIN_METAMASK:
            return state.set('loggingIn', true);
        case LOGIN_SUCCESS:
            return state.set('loggingIn', false);
    }

    return state;
}

export default loginReducer;
