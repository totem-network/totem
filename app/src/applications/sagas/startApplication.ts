import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    IStartApplicationAction,
    START_APPLICATION,
} from './../actions/application';
import { addInstance } from './../actions/instances';
import { addWindow } from './../actions/windows';
import {
    fetchManifest,
    fetchMetaData,
} from './../metadata';

function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // tslint:disable-next-line
        const r = Math.random() * 16 | 0;
        // tslint:disable-next-line
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function* startApplication(action: IStartApplicationAction) {
    try {
        const metaData = yield call(fetchMetaData, action.payload.application);

        const id = yield call(generateId);

        yield put(addInstance(
            action.payload.application,
            id,
            metaData.icon,
            metaData.themeColor,
            metaData.title,
        ));

        yield put(addWindow(
            id,
            800,
            400,
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
