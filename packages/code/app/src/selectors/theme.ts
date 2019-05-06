import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const themeSelector = (state: IImmutableState) => state.get('theme');

export default createSelector(
    themeSelector,
    (theme) => {
        return theme;
    },
);
