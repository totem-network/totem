import { createSelector } from 'reselect';
import { IImmutableState } from '../../reducers';

const launcherSelector = (state: IImmutableState) => {
    return state.get('app').get('launcher').toJS();
};

export default createSelector(
    launcherSelector,
    (launcher) => {
        return {
            isVisible: launcher.showLauncher,
        };
    },
);
