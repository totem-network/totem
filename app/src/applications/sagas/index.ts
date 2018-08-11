import { all, fork } from 'redux-saga/effects';
import closeApplicationSaga from './closeApplication';
import startApplicationSaga from './startApplication';

export default function* applicationsSaga() {
    yield all([
        fork(closeApplicationSaga),
        fork(startApplicationSaga),
    ]);
}
