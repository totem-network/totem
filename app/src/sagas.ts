import loginSaga from 'account/sagas/login';
import { sagas as applicationSagas } from 'applications';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

export const sagaMiddleware = createSagaMiddleware();

export default function* startupSaga() {
    yield all([
        fork(loginSaga),
        fork(applicationSagas),
    ]);
}
