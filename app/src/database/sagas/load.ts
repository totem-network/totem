import { put, takeEvery } from 'redux-saga/effects';
import {
    ILoadEdgeAction,
    LOAD_EDGE,
    loadEdgeError,
    loadEdgeSuccess,
} from './../actions/loadEdge';
import {
    ILoadNodeAction,
    LOAD_NODE,
    loadNodeError,
    loadNodeSuccess,
} from './../actions/loadNode';
import {
    IStorageReadErrorAction,
    IStorageReadSuccessAction,
    STORAGE_READ_ERROR,
    STORAGE_READ_SUCCESS,
    storageRead,
} from './../actions/storage';

function* load(action: ILoadEdgeAction | ILoadNodeAction) {
    const { hash, storage } = action.payload;
    yield put(storageRead(hash, storage));
}

function* storageReadError(action: IStorageReadErrorAction) {
    // TODO
    yield put(loadEdgeError('some error', 'hash'));
    yield put(loadNodeError('some error', 'hash'));
}

function* storageReadSuccess(action: IStorageReadSuccessAction) {
    // TODO
    yield put(loadEdgeSuccess('data', 'hash'));
    yield put(loadNodeSuccess('data', 'hash'));
}

export default function* loadSaga() {
    yield takeEvery(LOAD_EDGE, load);
    yield takeEvery(LOAD_NODE, load);

    yield takeEvery(STORAGE_READ_ERROR, storageReadError);
    yield takeEvery(STORAGE_READ_SUCCESS, storageReadSuccess);
}
