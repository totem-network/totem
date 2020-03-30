import { sagas as accountSagas } from 'account';
import { appSagas, initializeSaga } from 'app';
import { sagas as applicationsSagas } from 'applications';
import { sagas as fileSystemSagas } from 'filesystem';
import { sagas as networkSagas } from 'network';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { sagas as settingsSagas } from 'settings';

export const sagaMiddleware = createSagaMiddleware();

export default function* startupSaga() {
    yield all([
        fork(appSagas),
        fork(accountSagas),
        fork(applicationsSagas),
        fork(fileSystemSagas),
        fork(networkSagas),
        fork(settingsSagas),
    ]);

    yield fork(initializeSaga);
}
