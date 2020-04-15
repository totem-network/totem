import { HIDE_SYSTEM_BAR_DRAWER } from 'app';
import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import {
    HIDE_VIEW,
    SHOW_VIEW,
    TOGGLE_VIEW,
    ViewsAction,
} from '../actions/views';

interface IViewsState {
    account: boolean;
    network: boolean;
    permissions: boolean;
}

export interface IImmutableViewsState extends IImmutableStateMap<IViewsState> {}

const initialState = fromJS({
    account: false,
    network: false,
    permissions: false,
});

function instancesReducer(
    state: IImmutableViewsState = initialState,
    action: ViewsAction,
): IImmutableViewsState {

    switch (action.type) {
        case SHOW_VIEW:
            return state.set(action.payload.view, true);
        case HIDE_VIEW:
            return state.set(action.payload.view, false);
        case TOGGLE_VIEW:
            return state.set(action.payload.view, !state.get(action.payload.view));
        case HIDE_SYSTEM_BAR_DRAWER:
            return initialState;
    }

    return state;
}

export default instancesReducer;
