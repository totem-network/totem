import { all, fork } from 'redux-saga/effects';
import expireNotificationSaga from './expireNotification';
import pushNotificationSaga from './pushNotification';

export default function* notificationsSaga() {
    yield all([
        fork(expireNotificationSaga),
        fork(pushNotificationSaga),
    ]);
}
