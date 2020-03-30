import { all, fork } from 'redux-saga/effects';
import clearStorageSaga from './clearStorage';
import uploadFilesSaga from './uploadFiles';

export default function* appSaga() {
    yield all([
        fork(clearStorageSaga),
        fork(uploadFilesSaga),
    ]);
}
