import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import categoriesReducer, { IImmutableCategoriesState } from './categories';
import instancesReducer, { IImmutableInstancesState } from './instances';

interface IFileSystemState {
    categories: IImmutableCategoriesState;
    instances: IImmutableInstancesState;
}

export interface IImmutableFileSystemState extends IImmutableStateMap<IFileSystemState> {}

// TODO: load instances reducer dynamicly when filesystem gets opened

export default combineReducers({
    categories: categoriesReducer,
    instances: instancesReducer,
});
