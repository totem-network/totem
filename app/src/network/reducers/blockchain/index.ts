import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import accountReducer, { IImmutableAccountState } from './account';
import contractReducer, { IImmutableContractState } from './contract';
import transactionReducer, { IImmutableTransactionState } from './transaction';

interface IBlockchainState {
    account: IImmutableAccountState;
    contract: IImmutableContractState;
    transaction: IImmutableTransactionState;
}

export interface IImmutableBlockchainState extends IImmutableStateMap<IBlockchainState> {}

export default combineReducers({
    account: accountReducer,
    contract: contractReducer,
    transaction: transactionReducer,
});
