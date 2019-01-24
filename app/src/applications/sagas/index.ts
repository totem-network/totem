import { all, fork } from 'redux-saga/effects';
import closeApplicationSaga from './closeApplication';
import closeEmptyTaskManager from './closeEmptyTaskManager';
import showTaskManagerSaga from './showTaskManager';
import startApplicationSaga from './startApplication';

export default function* applicationsSaga() {
    yield all([
        fork(closeApplicationSaga),
        fork(closeEmptyTaskManager),
        fork(showTaskManagerSaga),
        fork(startApplicationSaga),
    ]);
}
