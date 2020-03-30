import { all, fork } from 'redux-saga/effects';
import initializeSaga from './initialize';
import loginSaga from './login';
import logoutSaga from './logout';

export default function* accountSaga() {
    yield all([
        fork(initializeSaga),
        fork(loginSaga),
        fork(logoutSaga),
    ]);
}
