import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import {
    ADD_NOTIFICATION,
    IAddNotificationAction,
} from '../actions/queue';

function* pushNotification(action: IAddNotificationAction) {
    // TODO: make push notification and request permission if necessary
}

export default function* pushNotificationSaga() {
    yield takeEvery(ADD_NOTIFICATION, pushNotification);
}
