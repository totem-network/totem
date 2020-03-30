import { call, put, takeLatest } from 'redux-saga/effects';
import { clearStorage } from 'app';
import { store } from 'state';
import { getCurrentNetworkSigner } from 'utils/blockchain';
import {
    ILogoutAction,
    LOGOUT,
    LOGOUT_SUCCESS,
    logoutSuccess,
} from '../actions/logout';
import boxes from '../profile/boxes';
import accountAddressSelector from '../selectors/accountAddress';

function* logout(action: ILogoutAction) {
    const state = yield call(store.getState);
    const account = yield call(accountAddressSelector, state);

    const currentSigner = yield call(getCurrentNetworkSigner);
    const wrappedSigner = yield call(boxes.wrapEthersSigner, currentSigner);

    const box = yield call([boxes, boxes.openBox], account, wrappedSigner);

    yield call([box, box.logout]);

    yield put(clearStorage());
    yield put(logoutSuccess());
}

function* redirect() {
    //
}

export default function* logoutSaga() {
    yield takeLatest(LOGOUT, logout);
    yield takeLatest(LOGOUT_SUCCESS, redirect);
}
