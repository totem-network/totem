import { fromJS } from 'immutable';
import { IImmutableStateMap } from 'redux-utils';
import { HIDE_LAUNCHER, LauncherAction, SHOW_LAUNCHER } from '../actions/launcher';

interface ILauncherState {
    showLauncher: boolean;
}

export interface IImmutableLauncherState extends IImmutableStateMap<ILauncherState> {}

const initialState = fromJS({
    showLauncher: false,
});

function launcherReducer(
    state: IImmutableLauncherState = initialState,
    action: LauncherAction,
): IImmutableLauncherState {

    switch (action.type) {
        case SHOW_LAUNCHER:
            return state.set('showLauncher', true);
        case HIDE_LAUNCHER:
            return state.set('showLauncher', false);
    }

    return state;
}

export default launcherReducer;
