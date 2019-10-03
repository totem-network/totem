import { all, fork } from 'redux-saga/effects';
import blockchainSaga from './blockchain';
import storageSaga from './storage';

export default function* networkSaga() {
    yield all([
        fork(blockchainSaga),
        fork(storageSaga),
    ]);
}
