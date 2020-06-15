import { LOGOUT_SUCCESS } from 'account/actions/logout';
import accountReducer, { IImmutableAccountState } from 'account/reducers';
import apiReducer, { IImmutableApiState } from 'api/reducers';
import appReducer, { IImmutableAppState } from 'app/reducers';
import applicationsReducer, { IImmutableApplicationsState } from 'applications/reducers';
import { connectRouter, RouterState } from 'connected-react-router/immutable';
import filesystemReducer, { IImmutableFileSystemState } from 'filesystem/reducers';
import networkReducer, { IImmutableNetworkState } from 'network/reducers';
import notificationsReducer, { IImmutableNotificationsState } from 'notifications/reducers';
import { AnyAction, Reducer } from 'redux';
import { combineReducers } from 'redux-immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import settingsReducer, { IImmutableSettingsState } from 'settings/reducers';

interface IState {
    account: IImmutableAccountState;
    api: IImmutableApiState;
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
            api: apiReducer,
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
