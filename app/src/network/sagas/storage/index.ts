import { all, fork } from 'redux-saga/effects';
import initializeSaga from './initialize';

export default function* storageSaga() {
    yield all([
        fork(initializeSaga),
    ]);
}
