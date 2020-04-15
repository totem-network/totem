import {
    ADD_INSTANCE,
    CLOSE_INSTANCE,
    InstancesAction as ApplicationInstancesAction,
} from 'applications/actions/instances';
import {
    Map,
} from 'immutable';
import {
    InstancesAction,
    SELECT_CATEGORY,
} from '../actions/instances';

interface IInstancesState {
    category: string;
}

export interface IImmutableInstancesState extends Map<string, IInstancesState> {}

const initialState = Map<string, IInstancesState>({});

function instancesReducer(
    state: IImmutableInstancesState = initialState,
    action: InstancesAction | ApplicationInstancesAction,
): IImmutableInstancesState {

    switch (action.type) {
        case ADD_INSTANCE:
            if (action.payload.application === 'filesystem') {
                let category = 'crypto-currencies';
                if (action.payload.options.category) {
                    category = action.payload.options.category;
                }

                return state.set(action.payload.id, {
                    category,
                });
            }
        case CLOSE_INSTANCE:
            return state.delete(action.payload.id);
        case SELECT_CATEGORY:
            return state.update(action.payload.instance, (instance: IInstancesState) => {
                return {
                    ...instance,
                    category: action.payload.category,
                };
            });
    }

    return state;
}

export default instancesReducer;
