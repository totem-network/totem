import { fromJS, List } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import {
    STORAGE_READ,
    STORAGE_READ_ERROR,
    STORAGE_READ_SUCCESS,
    StorageAction,
} from './../actions/storage';

interface IStorageState {
    loading: List<string>; // TODO: interface for loading items
}

export interface IImmutableStorageState extends IImmutableStateMap<IStorageState> {}

const initialState = fromJS({
    loading: List<string>(),
});

function storageReducer(state: IImmutableStorageState = initialState, action: StorageAction): IImmutableStorageState {

    switch (action.type) {
        case STORAGE_READ:
            return state.set('loading', state.get('loading').push(action.payload.hash));
        case STORAGE_READ_ERROR:
            return state.set('loading', state.get('loading').filter((value?: string) => {
                return (value !== action.payload.hash);
            }) as List<string>);
        case STORAGE_READ_SUCCESS:
            return state.set('loading', state.get('loading').filter((value?: string) => {
                return (value !== action.payload.hash);
            }) as List<string>);
    }

    return state;
}

export default storageReducer;
