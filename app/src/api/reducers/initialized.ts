import { fromJS } from 'immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import { InitializedAction, API_INITIALIZED, API_INITIALIZED_ERROR } from '../actions/initialize';

interface IInitializedState {
    api: boolean;
}

export interface IImmutableInitializedState extends IImmutableStateMap<IInitializedState> {}

const initialState = fromJS({
    api: false,
});

function initializedReducer(
    state: IImmutableInitializedState = initialState,
    action: InitializedAction,
): IImmutableInitializedState {

    switch (action.type) {
        case API_INITIALIZED:
            return state.set('api', true);
        case API_INITIALIZED_ERROR:
            return state.set('api', false);
    }

    return state;
}

export default initializedReducer;
