import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import { HIDE_SIDE_NAV, NavAction, SHOW_SIDE_NAV } from './../actions/sideNav';

interface INavState {
    showSideNav: boolean;
}

export interface IImmutableNavState extends IImmutableStateMap<INavState> {}

const initialState = fromJS({
    showSideNav: false,
});

function navReducer(state: IImmutableNavState = initialState, action: NavAction): IImmutableNavState {

    switch (action.type) {
        case SHOW_SIDE_NAV:
            return state.set('showSideNav', true);
        case HIDE_SIDE_NAV:
            return state.set('showSideNav', false);
    }

    return state;
}

export default navReducer;
