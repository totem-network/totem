import { combineReducers } from 'redux-immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import accountsReducer, { IImmutableAccountsState } from './accounts';
import contractsReducer, { IImmutableContractsState } from './contracts';
import currentNetworkReducer, { IImmutableCurrentNetworkState } from './currentNetwork';
import transactionsReducer, { IImmutableTransactionsState } from './transactions';

interface IBlockchainState {
    accounts: IImmutableAccountsState;
    contracts: IImmutableContractsState;
    currentNetwork: IImmutableCurrentNetworkState;
    transactions: IImmutableTransactionsState;
}

export interface IImmutableBlockchainState extends IImmutableStateMap<IBlockchainState> {}

export default combineReducers({
    accounts: accountsReducer,
    contracts: contractsReducer,
    currentNetwork: currentNetworkReducer,
    transactions: transactionsReducer,
});
