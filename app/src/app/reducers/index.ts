import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import initializedReducer, { IImmutableInitializedState } from './initialized';
import intlReducer, { IImmutableIntlState } from './intl';
import launcherReducer, { IImmutableLauncherState } from './launcher';
import routerReducer from './router';
import navReducer, { IImmutableNavState } from './sideNav';
import systemBarReducer, { IImmutableSystemBarState } from './systemBar';

interface IAppState {
    initialized: IImmutableInitializedState;
    intl: IImmutableIntlState;
    launcher: IImmutableLauncherState;
    nav: IImmutableNavState;
    systemBar: IImmutableSystemBarState;
}

export interface IImmutableAppState extends IImmutableStateMap<IAppState> {}

export default combineReducers({
    initialized: initializedReducer,
    intl: intlReducer,
    launcher: launcherReducer,
    nav: navReducer,
    routing: routerReducer,
    systemBar: systemBarReducer,
});
