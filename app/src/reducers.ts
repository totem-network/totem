import { IImmutableAccountState, LOGOUT_SUCCESS, reducer as accountReducer } from 'account';
import { IImmutableApplicationsState, reducer as applicationsReducer } from 'applications';
import { connectRouter, RouterState } from 'connected-react-router/immutable';
import { IImmutableFileSystemState, reducer as filesystemReducer } from 'filesystem';
import { IImmutableNetworkState, reducer as networkReducer } from 'network';
import notificationsReducer, { IImmutableNotificationsState } from 'notifications/reducers';
import { AnyAction, Reducer } from 'redux';
import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import { IImmutableSettingsState, reducer as settingsReducer } from 'settings';
import appReducer, { IImmutableAppState } from './app/reducers';

interface IState {
    account: IImmutableAccountState;
    app: IImmutableAppState;
    applications: IImmutableApplicationsState;
    filesystem: IImmutableFileSystemState;
    network: IImmutableNetworkState;
    notifications: IImmutableNotificationsState;
    router: any;
    settings: IImmutableSettingsState;
}

export interface IImmutableState extends IImmutableStateMap<IState> {}

const createRootReducer = (history: any) => {
    return combineReducers<IImmutableState>(
        {
            account: accountReducer,
            app: appReducer,
            applications: applicationsReducer,
            filesystem: filesystemReducer,
            network: networkReducer,
            notifications: notificationsReducer,
            router: connectRouter(history),
            settings: settingsReducer,
        } as any,
    ) as Reducer<IImmutableState, AnyAction>;
};

export default (history: any) => {
    return (state: IImmutableState | undefined, action: AnyAction) => {
        const rootReducer = createRootReducer(history);

        if (action.type === LOGOUT_SUCCESS) {
            state = undefined;
        }

        return rootReducer(state, action);
    };
};
