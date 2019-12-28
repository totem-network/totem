import { INITIALIZE } from 'app';
import Ipfs from 'ipfs';
import { call, put, select, take } from 'redux-saga/effects';
import ProviderManager from '../../storage/ProviderManager';

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    // TODO: lazyload ipfs

    /*const node = yield call(Ipfs.create, {
        EXPERIMENTAL: { pubsub: true },
        repo: 'totem',
    });*/

    const node = yield call(() => {
        return new Ipfs({
            EXPERIMENTAL: { pubsub: true },
            repo: 'totem',
        });
    });

    yield node.ready;

    yield call(ProviderManager.setProvider, 'ipfs', '1', node);
}
