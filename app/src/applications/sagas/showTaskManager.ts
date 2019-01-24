import {
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    SHOW_TASK_MANAGER,
} from '../actions/taskManager';
import {
    minimizeAll,
} from '../actions/windows';

function* showTaskManager() {
    yield put(minimizeAll());
}

export default function* showTaskManagerSaga() {
    yield takeLatest(SHOW_TASK_MANAGER, showTaskManager);
}
