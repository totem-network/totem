import { BlockchainProviderManager, currentNetworkSelector } from 'network';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { addDomain, IResolveDomainAction, RESOLVE_DOMAIN } from '../actions/domain';

function* resolveDomainSaga(resolveDomainAction: IResolveDomainAction) {
    const { domain } = resolveDomainAction.payload;

    const currentNetwork = yield select(currentNetworkSelector);
    const provider = yield BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!provider) {
        return;
    }

    const address = yield provider.resolveName(domain);

    if (address) {
        yield put(addDomain(domain, address));
    }
}

export default function* domainSaga() {
    yield takeEvery(RESOLVE_DOMAIN, resolveDomainSaga);
}
