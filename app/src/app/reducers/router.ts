import { LOCATION_CHANGE } from 'connected-react-router';
import { fromJS } from 'immutable';

const initialState = fromJS({
    locationBeforeTransitions: null,
});

export default (state = initialState, action: any) => {
    if (action.type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', action.payload);
    }

    return state;
};
