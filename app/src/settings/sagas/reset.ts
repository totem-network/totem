import boxes from 'account/profile/boxes';
import accountAddressSelector from 'account/selectors/accountAddress';
import { clearStorage } from 'app/actions/clearStorage';
import { call, put, takeEvery } from 'redux-saga/effects';
import { store } from 'state';
import { getCurrentNetworkSigner } from 'utils/blockchain';
import {
    accountReset,
    IResetAccountAction,
    RESET_ACCOUNT,
} from '../actions/account';

function* resetAccount(action: IResetAccountAction) {
    const state = yield call(store.getState);
    const account = yield call(accountAddressSelector, state);

    const currentSigner = yield call(getCurrentNetworkSigner);
    const wrappedSigner = yield call(boxes.wrapEthersSigner, currentSigner);

    const box = yield call([boxes, boxes.openBox], account, wrappedSigner);
    const space = yield call([box, box.openSpace], 'vinyai');

    const privateEntries = yield call(space.private.all);

    for (const key in privateEntries) {
        if (privateEntries[key]) {
            yield call(space.private.remove, key);
        }
    }

    const publicEntries = yield call(space.public.all);

    for (const key in publicEntries) {
        if (publicEntries[key]) {
            yield call(space.public.remove, key);
        }
    }

    yield put(clearStorage(true));

    yield put(accountReset());
}

export default function* resetSaga() {
    yield takeEvery(RESET_ACCOUNT, resetAccount);
}
