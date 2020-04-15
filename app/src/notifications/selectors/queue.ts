import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const queueSelector = (state: IImmutableState) => state.get('notifications').get('queue').toJS();

export default createSelector(
    queueSelector,
    (queue) => {
        return queue;
    },
);
