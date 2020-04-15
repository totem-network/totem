import { INITIALIZE, web3Initialized } from 'app/actions/initialize';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setProvidedAccounts } from './../actions/providedAccounts';

export function* initialize(action: any) {
    if (!action.payload.ethereum) {
        yield put(web3Initialized());

        return;
    }

    const accounts = yield call(action.payload.ethereum.enable);

    yield put(web3Initialized());

    yield put(setProvidedAccounts(accounts));
}

export default function* initializeSaga() {
    yield takeEvery(INITIALIZE, initialize);
}
