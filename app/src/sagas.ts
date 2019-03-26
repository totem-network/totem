import { sagas as accountSagas } from 'account';
import { sagas as apiSagas } from 'api';
import { initializeSaga } from 'app';
import { sagas as applicationsSagas } from 'applications';
import { sagas as networkSagas } from 'network';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

export const sagaMiddleware = createSagaMiddleware();

export default function* startupSaga() {
    yield all([
        fork(accountSagas),
        fork(apiSagas),
        fork(applicationsSagas),
        fork(networkSagas),
    ]);

    yield fork(initializeSaga);
}
