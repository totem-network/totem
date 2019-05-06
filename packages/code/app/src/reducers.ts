import { AnyAction, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import actionsReducer, { IImmutableActionsState } from './reducers/actions';
import intlReducer, { IImmutableIntlState } from './reducers/intl';
import themeReducer, { IImmutableThemeState } from './reducers/theme';
import IImmutableStateMap from './utils/IImmutableStateMap';

interface IState {
    actions: IImmutableActionsState;
    form: any;
    intl: IImmutableIntlState;
    theme: IImmutableThemeState;
}

export interface IImmutableState extends IImmutableStateMap<IState> {}

export const reducers = {
    actions: actionsReducer,
    form: formReducer,
    intl: intlReducer,
    theme: themeReducer,
};

export default combineReducers<IImmutableState>(
    reducers,
) as Reducer<IImmutableState, AnyAction>;
