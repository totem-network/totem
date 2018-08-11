import { fork } from 'redux-saga/effects';
import loadSaga from './load';

export default function* databaseSaga() {
    yield fork(loadSaga);
}
