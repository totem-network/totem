import { all, fork } from 'redux-saga/effects';
import permissionSaga from './permission';
import resetSaga from './reset';

export default function* appSaga() {
    yield all([
        fork(permissionSaga),
        fork(resetSaga),
    ]);
}
