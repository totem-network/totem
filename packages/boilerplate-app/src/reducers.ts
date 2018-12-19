import { AnyAction, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';

interface IState {
    form: any;
}

export interface IImmutableState extends IImmutableStateMap<IState> {}

export const reducers = {
    form: formReducer,
};

export default combineReducers<IImmutableState>(
    reducers,
) as Reducer<IImmutableState, AnyAction>;
