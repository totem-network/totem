import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import { AccountAction, LOGIN_SUCCESS } from './../actions/login';

interface IAccountState {
    address: string | null;
}

export interface IImmutableAccountState extends IImmutableStateMap<IAccountState> {}

const initialState = fromJS({
    address: null,
});

function accountReducer(state: IImmutableAccountState = initialState, action: AccountAction): IImmutableAccountState {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return state.set('address', action.payload.address);
    }

    return state;
}

export default accountReducer;
