import {
    put,
    select,
    takeLatest,
} from 'redux-saga/effects';
import {
    hideTaskManager,
} from '../actions/taskManager';
import {
    CLOSE_WINDOW,
    ICloseWindowAction,
} from '../actions/windows';
import { IWindowsState } from '../reducers/windows';
import windowsSelector from '../selectors/windows';

function* closeEmptyTaskManager(action: ICloseWindowAction) {
    const windows = yield select(windowsSelector);

    const windowsOpen = windows.filter((window: IWindowsState) => {
        return (window.instance !== action.payload.instance);
    }).length;

    if (windowsOpen === 0) {
        yield put(hideTaskManager());
    }
}

export default function* closeEmptyTaskManagerSaga() {
    yield takeLatest(CLOSE_WINDOW, closeEmptyTaskManager);
}
