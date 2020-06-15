import { INITIALIZE } from 'app/actions/initialize';
import { call, put, take } from 'redux-saga/effects';
import { api } from 'worker';
import { apiInitialized, apiInitializedError } from '../actions/initialize';

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    // TODO: lazy loading api worker?

    const result = yield call([api, api.initialize]);

    if (result) {
        yield put(apiInitialized());
    } else {
        yield put(apiInitializedError());
    }
}
