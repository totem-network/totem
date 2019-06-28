import { INITIALIZE, web3Initialized } from 'app';
import { call, put, take } from 'redux-saga/effects';
import { setProvidedAccounts } from './../actions/providedAccounts';

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    if (!initializeAction.payload.ethereum) {
        yield put(web3Initialized());

        return;
    }

    const accounts = yield call(initializeAction.payload.ethereum.enable);

    yield put(web3Initialized());

    yield put(setProvidedAccounts(accounts));
}
