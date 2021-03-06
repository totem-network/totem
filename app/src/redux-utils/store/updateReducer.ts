import { Reducer } from 'redux';
import { reducers, store } from './../../state';
import combineLazyReducers from './combineLazyReducers';

interface IReducerInfo {
    name: string;
    reducer: Reducer;
}

const asyncReducers: any = {};

const updateReducer = (reducerInfo: IReducerInfo) => {
    asyncReducers[reducerInfo.name] = reducerInfo.reducer;

    store.replaceReducer(combineLazyReducers({
        ...reducers,
        ...asyncReducers,
    }, store.getState()));
};

export default updateReducer;
