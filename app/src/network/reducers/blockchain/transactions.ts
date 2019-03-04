import { fromJS, List } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import { AccountsAction } from '../../actions/blockchain/accounts';

interface ITransactionsState {
    // state: pending: stack?, done: map with tx hash as index
}

export interface IImmutableTransactionsState extends IImmutableStateMap<ITransactionsState> {}

const initialState = fromJS({
    //
});

function transactionReducer(
    state: IImmutableTransactionsState = initialState,
    action: AccountsAction,
): IImmutableTransactionsState {

    switch (action.type) {
    }

    return state;
}

export default transactionReducer;
