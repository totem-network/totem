import { INITIALIZE } from 'app';
import { providers } from 'ethers';
import { call, put, take } from 'redux-saga/effects';
import { setCurrentNetwork } from '../../actions/blockchain/currentNetwork';
import ProviderManager from '../../blockchain/ProviderManager';

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    const network = initializeAction.payload.ethereum.networkVersion;

    try {
        ProviderManager.setProvider(
            'ethereum',
            network,
            // TODO: are ethers.js providers compatible with web3 providers (MetaMask)?
            new providers.Web3Provider(initializeAction.payload.ethereum),
        );
    } catch (error) {
        //
    }

    yield put(setCurrentNetwork(network, 'ethereum'));
}
