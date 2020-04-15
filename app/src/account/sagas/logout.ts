import proxyWeb3 from 'api/links/proxyWeb3';
import { clearStorage } from 'app/actions/clearStorage';
import initializeSaga from 'app/sagas/initialize';
import { proxy } from 'comlink';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from 'worker';
import {
    ILogoutAction,
    LOGOUT,
    LOGOUT_SUCCESS,
    logoutSuccess,
} from '../actions/logout';

export function* logoutApiWorker() {
    return yield (api as any).logout(proxy(proxyWeb3));
}

function* logout(action: ILogoutAction) {
    yield call(logoutApiWorker);

    // TODO: cannot login after logout
    // Error: No Signer in ProxySigner

    yield put(clearStorage());
    yield put(logoutSuccess());
}

function* initialize() {
    yield fork(initializeSaga);
}

export default function* logoutSaga() {
    yield takeLatest(LOGOUT, logout);
    yield takeLatest(LOGOUT_SUCCESS, initialize);
}
