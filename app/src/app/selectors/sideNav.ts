import { createSelector } from 'reselect';
import { IImmutableState } from './../../reducers';

const sideNavSelector = (state: IImmutableState) => state.get('app').get('nav').toJS();

export default createSelector(
    sideNavSelector,
    (nav) => {
        return {
            isVisible: nav.showSideNav,
        };
    },
);
