import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import accountsReducer, { IImmutableAccountsState } from './accounts';
import contractsReducer, { IImmutableContractsState } from './contracts';
import currentNetworkReducer, { IImmutableCurrentNetworkState } from './currentNetwork';
import feesReducer, { IImmutableFeesState } from './fees';
import transactionsReducer, { IImmutableTransactionsState } from './transactions';

interface IBlockchainState {
    accounts: IImmutableAccountsState;
    contracts: IImmutableContractsState;
    currentNetwork: IImmutableCurrentNetworkState;
    fees: IImmutableFeesState;
    transactions: IImmutableTransactionsState;
}

export interface IImmutableBlockchainState extends IImmutableStateMap<IBlockchainState> {}

export default combineReducers({
    accounts: accountsReducer,
    contracts: contractsReducer,
    currentNetwork: currentNetworkReducer,
    fees: feesReducer,
    transactions: transactionsReducer,
});
