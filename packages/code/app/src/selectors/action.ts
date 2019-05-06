import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';
import { IParams } from '../actions/actions';

const actionSelector = (state: IImmutableState, name: string) => {
    return state.get('actions').find((value?: IParams) => {
        if (!value) {
            return false;
        }

        return (value.name === name);
    });
};

export default createSelector(
    actionSelector,
    (action) => {
        return action;
    },
);
