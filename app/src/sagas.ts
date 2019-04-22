import { sagas as accountSagas } from 'account';
import { initializeSaga } from 'app';
import { sagas as applicationsSagas } from 'applications';
import { sagas as networkSagas } from 'network';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

export const sagaMiddleware = createSagaMiddleware();

export default function* startupSaga() {
    yield all([
        fork(accountSagas),
        fork(applicationsSagas),
        fork(networkSagas),
    ]);

    yield fork(initializeSaga);
}
