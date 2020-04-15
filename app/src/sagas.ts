import accountSagas from 'account/sagas';
import appSagas from 'app/sagas';
import initializeSaga from 'app/sagas/initialize';
import applicationsSagas from 'applications/sagas';
import fileSystemSagas from 'filesystem/sagas';
import networkSagas from 'network/sagas';
import notificationsSaga from 'notifications/sagas';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import settingsSagas from 'settings/sagas';

export const sagaMiddleware = createSagaMiddleware();

export default function* startupSaga() {
    yield all([
        fork(appSagas),
        fork(accountSagas),
        fork(applicationsSagas),
        fork(fileSystemSagas),
        fork(networkSagas),
        fork(notificationsSaga),
        fork(settingsSagas),
    ]);

    yield fork(initializeSaga);
}
