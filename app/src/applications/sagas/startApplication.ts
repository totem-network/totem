import { nanoid } from 'nanoid';
import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    IStartApplicationAction,
    START_APPLICATION,
} from '../actions/application';
import { addInstance } from '../actions/instances';
import { addWindow } from '../actions/windows';
import {
    fetchManifest,
    fetchMetaData,
} from '../metadata';

function* startApplication(action: IStartApplicationAction) {
    try {
        const metaData = yield call(fetchMetaData, action.payload.application, action.payload.manifestUrl);

        const id = yield call(nanoid);

        yield put(addInstance(
            action.payload.application,
            id,
            metaData.icon,
            metaData.themeColor,
            metaData.title,
            action.payload.options,
        ));

        yield put(addWindow(
            id,
            900,
            550,
            100,
            100,
        ));
    } catch (error) {
        // TODO: Add error message?
        // logger.error(error);
    }
}

export default function* startApplicationSaga() {
    yield takeLatest(START_APPLICATION, startApplication);
}
