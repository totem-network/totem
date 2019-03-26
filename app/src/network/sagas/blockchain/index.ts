import { all, fork } from 'redux-saga/effects';
import fetchFeeSaga from './fetchFee';
import initializeSaga from './initialize';

export default function* blockchainSaga() {
    yield all([
        fork(fetchFeeSaga),
        fork(initializeSaga),
    ]);
}
