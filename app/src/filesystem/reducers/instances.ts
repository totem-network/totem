import {
    ADD_INSTANCE,
    CLOSE_INSTANCE,
    InstancesAction as ApplicationInstancesAction,
} from 'applications';
import {
    Map,
} from 'immutable';
import {
    HIDE_SIDE_NAV,
    InstancesAction,
    SELECT_CATEGORY,
    SHOW_SIDE_NAV,
} from '../actions/instances';

interface IInstancesState {
    category: string;
    showSideNav: boolean;
}

export interface IImmutableInstancesState extends Map<string, IInstancesState> {}

const initialState = Map<string, IInstancesState>({});

function instancesReducer(
    state: IImmutableInstancesState = initialState,
    action: InstancesAction | ApplicationInstancesAction,
): IImmutableInstancesState {

    switch (action.type) {
        case ADD_INSTANCE:
            return state.set(action.payload.id, {
                category: 'crypto-currencies',
                showSideNav: true,
            });
        case CLOSE_INSTANCE:
            return state.delete(action.payload.id);
        case HIDE_SIDE_NAV:
            return state.update(action.payload.instance, (instance: IInstancesState) => {
                return {
                    ...instance,
                    showSideNav: false,
                };
            });
        case SELECT_CATEGORY:
            return state.update(action.payload.instance, (instance: IInstancesState) => {
                return {
                    ...instance,
                    category: action.payload.category,
                };
            });
        case SHOW_SIDE_NAV:
            return state.update(action.payload.instance, (instance: IInstancesState) => {
                return {
                    ...instance,
                    showSideNav: true,
                };
            });
    }

    return state;
}

export default instancesReducer;
