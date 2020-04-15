import { fromJS } from 'immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import { AccountsAction } from '../../actions/blockchain/accounts';

interface IAccount {
    platform: string;
    network: string;
    // config: IAccountConfig;
    // ...
}

// TODO: or List?
interface IAccountsState {
    [key: string]: IAccount;
}

export interface IImmutableAccountsState extends IImmutableStateMap<IAccountsState> {}

const initialState = fromJS({});

function accountsReducer(
    state: IImmutableAccountsState = initialState,
    action: AccountsAction,
): IImmutableAccountsState {

    switch (action.type) {
    }

    return state;
}

export default accountsReducer;
