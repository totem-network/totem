import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import { AccountAction } from './../../actions/blockchain/account';

interface IAccount {
    platform: string;
    network: string;
    // config: IAccountConfig;
    // ...
}

// TODO: or List?
interface IAccountState {
    [key: string]: IAccount;
}

export interface IImmutableAccountState extends IImmutableStateMap<IAccountState> {}

const initialState = fromJS({});

function accountReducer(state: IImmutableAccountState = initialState, action: AccountAction): IImmutableAccountState {

    switch (action.type) {
    }

    return state;
}

export default accountReducer;
