import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import intlReducer, { IImmutableIntlState } from './intl';
import routerReducer from './router';
import navReducer, { IImmutableNavState } from './sideNav';

interface IAppState {
    intl: IImmutableIntlState;
    nav: IImmutableNavState;
}

export interface IImmutableAppState extends IImmutableStateMap<IAppState> {}

export default combineReducers({
    intl: intlReducer,
    nav: navReducer,
    routing: routerReducer,
});
