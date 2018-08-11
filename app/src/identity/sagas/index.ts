import { takeLatest } from 'redux-saga/effects';
import { CREATE_IDENTITY } from './../actions/createIdentity';
import createIdentitySaga from './createIdentity';

export default function* identitySaga() {
    yield takeLatest(CREATE_IDENTITY, createIdentitySaga);
}
