import { INITIALIZE } from 'app';
import { call, put, take } from 'redux-saga/effects';
import { addProfile } from './../actions/profile';
import { setProvidedAccounts } from './../actions/providedAccounts';

// TODO: remove 3box from scripts and import package
const Box = (window as any).Box; // require('3box');

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    const accounts = yield initializeAction.payload.ethereum.enable();

    yield put(setProvidedAccounts(accounts));

    // fetch profiles

    for (const address of accounts) {
        try {
            const profile = yield call(Box.getProfile, address);

            const name = profile.name;
            const image = 'https://ipfs.infura.io/ipfs/' + profile.image[0].contentUrl['/'];

            yield put(addProfile(address, image, name));
        } catch (error) {
            console.log('No profile');
        }
    }
}
