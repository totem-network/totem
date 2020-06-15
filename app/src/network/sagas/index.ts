import { all, fork } from 'redux-saga/effects';
import blockchainSaga from './blockchain';

export default function* networkSaga() {
    yield all([
        fork(blockchainSaga),
    ]);
}
