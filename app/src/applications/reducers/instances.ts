import {
    List,
} from 'immutable';
import { combineReducers } from 'redux';
import { ADD_INSTANCE, CLOSE_INSTANCE, InstancesAction } from './../actions/instances';

interface IInstancesState {
    application: string;
    icon: string;
    id: string;
    themeColor: string;
    title: string;
}

export interface IImmutableInstancesState extends List<IInstancesState> {}

// TODO: default applications from user config
const initialState = List<IInstancesState>([]);

function instancesReducer(
    state: IImmutableInstancesState = initialState,
    action: InstancesAction,
): IImmutableInstancesState {

    switch (action.type) {
        case ADD_INSTANCE:
            return state.push({
                application: action.payload.application,
                icon: action.payload.icon,
                id: action.payload.id,
                themeColor: action.payload.themeColor,
                title: action.payload.title,
            });
        case CLOSE_INSTANCE:
            return state.filter((instance) => {
                if (!instance) {
                    return false;
                }

                return (instance.id !== action.payload.id);
            }) as IImmutableInstancesState;
    }

    return state;
}

export default instancesReducer;
