import { fromJS } from 'immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import {
    DrawerView,
    HIDE_SYSTEM_BAR_DRAWER,
    SHOW_SYSTEM_BAR_DRAWER,
    SystemBarAction,
} from '../actions/systemBar';

interface ISystemBarState {
    showDrawer: boolean;
    drawerView: DrawerView;
}

export interface IImmutableSystemBarState extends IImmutableStateMap<ISystemBarState> {}

const initialState = fromJS({
    showDrawer: false,
    drawerView: 'default',
});

function systemBarReducer(
    state: IImmutableSystemBarState = initialState,
    action: SystemBarAction
): IImmutableSystemBarState {

    switch (action.type) {
        case SHOW_SYSTEM_BAR_DRAWER:
            return state.set('showDrawer', true).set('drawerView', action.payload.drawerView);
        case HIDE_SYSTEM_BAR_DRAWER:
            return state.set('showDrawer', false);
    }

    return state;
}

export default systemBarReducer;
