import {
    ADD_INSTANCE,
    CLOSE_INSTANCE,
    InstancesAction as ApplicationInstancesAction,
} from 'applications/actions/instances';
import {
    Map,
} from 'immutable';
import {
    SELECT_VIEW,
    ViewsAction,
} from '../actions/views';

interface IViewsState {
    view: string;
}

export interface IImmutableViewsState extends Map<string, IViewsState> {}

const initialState = Map<string, IViewsState>({});

function instancesReducer(
    state: IImmutableViewsState = initialState,
    action: ViewsAction | ApplicationInstancesAction,
): IImmutableViewsState {

    switch (action.type) {
        case ADD_INSTANCE:
            if (action.payload.application === 'filesystem') {
                let view = 'default';
                if (action.payload.options.view) {
                    view = action.payload.options.view;
                }

                return state.set(action.payload.id, {
                    view,
                });
            }
        case CLOSE_INSTANCE:
            return state.delete(action.payload.id);
        case SELECT_VIEW:
            return state.update(action.payload.instance, (instance: IViewsState) => {
                return {
                    ...instance,
                    view: action.payload.view,
                };
            });
    }

    return state;
}

export default instancesReducer;
