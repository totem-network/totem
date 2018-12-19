import { all, fork } from 'redux-saga/effects';
import initializeSaga from './initialize';
import loginSaga from './login';

export default function* accountSaga() {
    yield all([
        fork(initializeSaga),
        fork(loginSaga),
    ]);
}
