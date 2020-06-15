import { all, fork } from 'redux-saga/effects';
import initializeSaga from './initialize';

export default function* apiSaga() {
    yield all([
        fork(initializeSaga),
    ]);
}
