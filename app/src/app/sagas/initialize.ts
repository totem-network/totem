import { put } from 'redux-saga/effects';
import { initialize } from './../actions/initialize';

export default function* initializeSaga() {
    let ethereum: any = null;
    if (
        window &&
        ((window as any).ethereum &&
        (window as any).ethereum.enable)
    ) {
        ethereum = (window as any).ethereum;
    }

    yield put(initialize(
        ethereum,
    ));
}
