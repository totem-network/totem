import { IImmutableAccountState, reducer as accountReducer } from 'account';
import { IImmutableApplicationsState, reducer as applicationsReducer } from 'applications';
import { connectRouter, RouterState } from 'connected-react-router/immutable';
import { IImmutableFileSystemState, reducer as filesystemReducer } from 'filesystem';
import { IImmutableNetworkState, reducer as networkReducer } from 'network';
import { AnyAction, Reducer } from 'redux';
import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import appReducer, { IImmutableAppState } from './app/reducers';

interface IState {
    account: IImmutableAccountState;
    app: IImmutableAppState;
    applications: IImmutableApplicationsState;
    filesystem: IImmutableFileSystemState;
    network: IImmutableNetworkState;
    router: any;
}

export interface IImmutableState extends IImmutableStateMap<IState> {}

export default (history: any) => combineReducers<IImmutableState>(
    {
        account: accountReducer,
        app: appReducer,
        applications: applicationsReducer,
        filesystem: filesystemReducer,
        network: networkReducer,
        router: connectRouter(history),
    } as any,
) as Reducer<IImmutableState, AnyAction>;
