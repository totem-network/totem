import { fromJS, Map } from 'immutable';
import { FeesAction, SET_FEE } from '../../actions/blockchain/fees';
import { getBlockchainId } from '../../utils/blockchain';

interface IFee {
    average: string;
    fast: string;
    network: string;
    platform: string;
    safeLow: string;
}

export interface IImmutableFeesState extends Map<string, IFee> {}

const initialState = fromJS({});

function networksReducer(
    state: IImmutableFeesState = initialState,
    action: FeesAction,
): IImmutableFeesState {

    switch (action.type) {
        case SET_FEE:
            return state.set(getBlockchainId(action.payload.platform, action.payload.network), {
                ...action.payload,
            });
    }

    return state;
}

export default networksReducer;
