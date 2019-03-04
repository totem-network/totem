import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import { AccountsAction } from '../../actions/blockchain/accounts';

interface IContractsState {
    // TODO: List? same as account
}

export interface IImmutableContractsState extends IImmutableStateMap<IContractsState> {}

const initialState = fromJS({});

function contractsReducer(
    state: IImmutableContractsState = initialState,
    action: AccountsAction,
): IImmutableContractsState {

    switch (action.type) {
    }

    return state;
}

export default contractsReducer;
