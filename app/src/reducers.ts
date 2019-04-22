import { IImmutableAccountState, reducer as accountReducer } from 'account';
import { IImmutableApplicationsState, reducer as applicationsReducer } from 'applications';
import { IImmutableFileSystemState, reducer as filesystemReducer } from 'filesystem';
import { IImmutableNetworkState, reducer as networkReducer } from 'network';
import { AnyAction, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { IImmutableStateMap } from 'redux-utils';
import appReducer, { IImmutableAppState } from './app/reducers';

interface IState {
    account: IImmutableAccountState;
    app: IImmutableAppState;
    applications: IImmutableApplicationsState;
    filesystem: IImmutableFileSystemState;
    form: any;
    network: IImmutableNetworkState;
}

export interface IImmutableState extends IImmutableStateMap<IState> {}

export const reducers = {
    account: accountReducer,
    app: appReducer,
    applications: applicationsReducer,
    filesystem: filesystemReducer,
    form: formReducer,
    network: networkReducer,
};

export default combineReducers<IImmutableState>(
    reducers as any,
) as Reducer<IImmutableState, AnyAction>;
