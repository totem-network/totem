import { fromJS, List } from 'immutable';
import {
    ProvidedAccountsAction,
    SET_PROVIDED_ACCOUNTS,
} from '../actions/providedAccounts';

export interface IImmutableProvidedAccountsState extends List<string> {}

const initialState = fromJS([]);

function providedAccountsReducer(
    state: IImmutableProvidedAccountsState = initialState,
    action: ProvidedAccountsAction,
): IImmutableProvidedAccountsState {

    switch (action.type) {
        case SET_PROVIDED_ACCOUNTS:
            return fromJS(action.payload.accounts);
    }

    return state;
}

export default providedAccountsReducer;
