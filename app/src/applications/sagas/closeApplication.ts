import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    CLOSE_APPLICATION,
    ICloseApplicationAction,
} from './../actions/application';
import { closeInstance } from './../actions/instances';
import { closeWindow } from './../actions/windows';
import { fetchMetaData } from './../metadata';

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
    yield takeLatest(CLOSE_APPLICATION, closeApplication);
}
