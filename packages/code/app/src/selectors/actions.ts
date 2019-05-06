import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const actionsSelector = (state: IImmutableState) => state.get('actions').toJS();

export default createSelector(
    actionsSelector,
    (actions) => {
        return actions;
    },
);
