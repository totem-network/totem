import { fromJS, Map } from 'immutable';
import {
    ADD_DOMAIN,
    DomainAction,
} from '../actions/domain';

export interface IImmutableDomainsState extends Map<string, string> {}

const initialState = fromJS({});

function domainsReducer(
    state: IImmutableDomainsState = initialState,
    action: DomainAction,
): IImmutableDomainsState {

    switch (action.type) {
        case ADD_DOMAIN:
            return state.set(action.payload.domain, action.payload.address);
    }

    return state;
}

export default domainsReducer;
