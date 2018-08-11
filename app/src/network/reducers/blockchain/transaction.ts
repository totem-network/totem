import { fromJS, List } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import { AccountAction } from './../../actions/blockchain/account';

interface ITransactionState {
    // state: pending: stack?, done: map with tx hash as index
}

export interface IImmutableTransactionState extends IImmutableStateMap<ITransactionState> {}

const initialState = fromJS({
    //
});

function transactionReducer(
    state: IImmutableTransactionState = initialState,
    action: AccountAction,
): IImmutableTransactionState {

    switch (action.type) {
    }

    return state;
}

export default transactionReducer;
