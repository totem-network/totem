import { fromJS, Map } from 'immutable';
import {
    ADD_PROFILE,
    ProfileAction,
} from '../actions/profile';

interface IProfileState {
    image?: string;
    name?: string;
}

export interface IImmutableProfileState extends Map<string, IProfileState> {}

const initialState = fromJS({});

function profileReducer(
    state: IImmutableProfileState = initialState,
    action: ProfileAction,
): IImmutableProfileState {

    switch (action.type) {
        case ADD_PROFILE:
            return state.set(action.payload.address, {
                image: action.payload.image,
                name: action.payload.name,
            });
    }

    return state;
}

export default profileReducer;
