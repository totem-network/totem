import { all, fork } from 'redux-saga/effects';
import resetSaga from './reset';

export default function* appSaga() {
    yield all([
        fork(resetSaga),
    ]);
}
