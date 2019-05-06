import { all, fork } from 'redux-saga/effects';
import uploadFilesSaga from './uploadFiles';

export default function* appSaga() {
    yield all([
        fork(uploadFilesSaga),
    ]);
}
