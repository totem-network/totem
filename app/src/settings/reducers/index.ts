import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import accountReducer, { IImmutableAccountState } from './account';
import viewsReducer, { IImmutableViewsState } from './views';

interface ISettingsState {
    account: IImmutableAccountState;
    views: IImmutableViewsState;
}

export interface IImmutableSettingsState extends IImmutableStateMap<ISettingsState> {}

export default combineReducers({
    account: accountReducer,
    views: viewsReducer,
});
