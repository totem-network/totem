import { INITIALIZE, web3Initialized } from 'app';
import { call, put, take } from 'redux-saga/effects';
import { addProfile } from './../actions/profile';
import { setProvidedAccounts } from './../actions/providedAccounts';

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    const accounts = yield initializeAction.payload.ethereum.enable();

    yield put(web3Initialized());

    yield put(setProvidedAccounts(accounts));

    const boxImport = yield import(/* webpackChunkName: '3box' */ '3box');

    const Box = boxImport.default;

    for (const address of accounts) {
        try {
            const profile = yield call(Box.getProfile, address);

            // TODO: if only name or only image is set the profile should be set with defaults (address, blockie)

            const name = profile.name;
            const image = 'https://ipfs.infura.io/ipfs/' + profile.image[0].contentUrl['/'];

            yield put(addProfile(address, image, name));
        } catch (error) {
            //
        }
    }
}
