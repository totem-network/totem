import { all, fork } from 'redux-saga/effects';
import initializeSaga from './initialize';

export default function* blockchainSaga() {
    yield all([
        fork(initializeSaga),
    ]);
}
