import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const systemBarSelector = (state: IImmutableState) => state.get('app').get('systemBar').toJS();

export default createSelector(
    systemBarSelector,
    (systemBar) => {
        return {
            isDrawerVisible: systemBar.showDrawer,
            drawerView: systemBar.drawerView,
        };
    },
);
