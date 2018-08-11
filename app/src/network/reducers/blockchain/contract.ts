import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import { AccountAction } from './../../actions/blockchain/account';

interface IContractState {
    // TODO: List? same as account
}

export interface IImmutableContractState extends IImmutableStateMap<IContractState> {}

const initialState = fromJS({});

function contractReducer(
    state: IImmutableContractState = initialState,
    action: AccountAction,
): IImmutableContractState {

    switch (action.type) {
    }

    return state;
}

export default contractReducer;
