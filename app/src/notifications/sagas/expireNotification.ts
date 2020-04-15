import { getTime } from 'date-fns';
import {
    call,
    delay,
    put,
    takeEvery,
} from 'redux-saga/effects';
import {
    ADD_NOTIFICATION,
    closeNotification,
    IAddNotificationAction,
} from '../actions/queue';

function* expireNotification(action: IAddNotificationAction) {
    const notification = action.payload.notification;
    const now = yield call(getTime, new Date());

    if (notification.expires) {
        if (notification.expires > now) {
            yield delay(notification.expires - now);
        }

        yield put(closeNotification(notification.id));
    }
}

export default function* expireNotificationSaga() {
    yield takeEvery(ADD_NOTIFICATION, expireNotification);
}
