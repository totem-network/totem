import { INITIALIZE } from 'app/actions/initialize';
import { proxy } from 'comlink';
import { call, put, take } from 'redux-saga/effects';
import { api } from 'worker';
import { apiInitialized, apiInitializedError } from '../actions/initialize';
import proxyWeb3 from '../links/proxyWeb3';

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    // TODO: lazy loading api worker?

    const result = yield api.initialize(proxy(
        proxyWeb3,
    ));

    // const result = yield call([api, api.initialize], proxy(
    //     proxyWeb3,
    // ));

    if (result) {
        yield put(apiInitialized());
    } else {
        yield put(apiInitializedError());
    }
}
