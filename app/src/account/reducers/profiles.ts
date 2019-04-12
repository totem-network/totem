import { fromJS, Map } from 'immutable';
import {
    ADD_PROFILE,
    ProfileAction,
} from '../actions/profile';

interface IProfileState {
    image?: string;
    name?: string;
}

export interface IImmutableProfilesState extends Map<string, IProfileState> {}

const initialState = fromJS({});

function profilesReducer(
    state: IImmutableProfilesState = initialState,
    action: ProfileAction,
): IImmutableProfilesState {

    switch (action.type) {
        case ADD_PROFILE:
            return state.set(action.payload.address, {
                image: action.payload.image,
                name: action.payload.name,
            });
    }

    return state;
}

export default profilesReducer;
