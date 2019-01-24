import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import intlReducer, { IImmutableIntlState } from './intl';
import launcherReducer, { IImmutableLauncherState } from './launcher';
import routerReducer from './router';
import navReducer, { IImmutableNavState } from './sideNav';

interface IAppState {
    intl: IImmutableIntlState;
    launcher: IImmutableLauncherState;
    nav: IImmutableNavState;
}

export interface IImmutableAppState extends IImmutableStateMap<IAppState> {}

export default combineReducers({
    intl: intlReducer,
    launcher: launcherReducer,
    nav: navReducer,
    routing: routerReducer,
});
