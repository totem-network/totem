import { Set } from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableState } from './../../reducers';

const combineLazyReducers = (reducers: any, initialState: any) => {
    const reducerKeys = Set(Object.keys(reducers));

    Object.keys(initialState)
        .filter((key) => !reducerKeys.has(key))
        .forEach((key) => {
            reducers[key] = (state: any) => {
                return (state === undefined) ? null : state;
            };
        });

    return combineReducers<IImmutableState>(reducers);
};

export default combineLazyReducers;
