import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const sideNavSelector = (state: IImmutableState) => state.get('app').get('nav').toJS();

export default createSelector(
    sideNavSelector,
    (nav) => {
        return {
            isVisible: nav.showSideNav,
        };
    },
);
