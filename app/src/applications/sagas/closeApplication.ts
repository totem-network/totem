import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import {
    CLOSE_APPLICATION,
    ICloseApplicationAction,
} from '../actions/application';
import { closeInstance } from '../actions/instances';
import { closeWindow } from '../actions/windows';

function* closeApplication(action: ICloseApplicationAction) {
    // TODO: let developers open a dialog: are you sure to quit

    yield put(closeInstance(
        action.payload.instance,
    ));

    yield put(closeWindow(
        action.payload.instance,
    ));
}

export default function* closeApplicationSaga() {
    yield takeEvery(CLOSE_APPLICATION, closeApplication);
}
