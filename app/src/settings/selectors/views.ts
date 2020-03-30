import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const viewsSelector = (state: IImmutableState) => state.get('settings').get('views').toJS();

export default createSelector(
    viewsSelector,
    (views) => {
        return views;
    },
);
