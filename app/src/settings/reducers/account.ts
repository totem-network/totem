import { fromJS } from 'immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import {
    AccountAction,
    ACCOUNT_RESET,
    HIDE_RESET_ACCOUNT_MODAL,
    RESET_ACCOUNT,
    SHOW_RESET_ACCOUNT_MODAL,
} from '../actions/account';

interface IAccountState {
    resetAccountModal: boolean;
    resettingAccount: boolean;
}

export interface IImmutableAccountState extends IImmutableStateMap<IAccountState> {}

const initialState = fromJS({
    resetAccountModal: false,
    resettingAccount: false,
});

function instancesReducer(
    state: IImmutableAccountState = initialState,
    action: AccountAction,
): IImmutableAccountState {

    switch (action.type) {
        case RESET_ACCOUNT:
            return state.set('resettingAccount', true);
        case ACCOUNT_RESET:
            return state.set('resettingAccount', false).set('resetAccountModal', false);
        case SHOW_RESET_ACCOUNT_MODAL:
            return state.set('resetAccountModal', true);
        case HIDE_RESET_ACCOUNT_MODAL:
            return state.set('resetAccountModal', false);
    }

    return state;
}

export default instancesReducer;
