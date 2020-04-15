import { fromJS } from 'immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import { InitializeAction, WEB3_INITIALIZED } from '../actions/initialize';

interface IInitializedState {
    web3: boolean;
}

export interface IImmutableInitializedState extends IImmutableStateMap<IInitializedState> {}

const initialState = fromJS({
    web3: false,
});

function initializedReducer(
    state: IImmutableInitializedState = initialState,
    action: InitializeAction,
): IImmutableInitializedState {

    switch (action.type) {
        case WEB3_INITIALIZED:
            return state.set('web3', true);
    }

    return state;
}

export default initializedReducer;
