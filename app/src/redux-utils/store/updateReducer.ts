import { Reducer } from 'redux';
import { reducers } from './../../reducers';
import { store } from './../../store';
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
