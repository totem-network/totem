import {
    fromJS,
    List,
} from 'immutable';
import {
    ActionsAction,
    CREATE_ACTION,
    DELETE_ACTION,
    ICreateActionPayload as IAction,
    UPDATE_ACTION,
} from '../actions/actions';

export interface IImmutableActionsState extends List<IAction> {}

const initialState = fromJS([]);

function themeReducer(state: IImmutableActionsState = initialState, action: ActionsAction): IImmutableActionsState {

    switch (action.type) {
        case CREATE_ACTION:
            return state.push(action.payload);
        case DELETE_ACTION:
            return state.delete(state.findIndex((value?: IAction) => {
                if (!value) {
                    return false;
                }

                return (value.name === action.payload.name);
            }));
        case UPDATE_ACTION:
            return state.update(state.findIndex((value?: IAction) => {
                if (!value) {
                    return false;
                }

                return (value.name === action.payload.name);
            }), (value: IAction) => {
                value.name = action.payload.newName;
                value.params = action.payload.params;

                return value;
            });
    }

    return state;
}

export default themeReducer;
