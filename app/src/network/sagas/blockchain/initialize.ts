import { INITIALIZE } from 'app';
import { providers } from 'ethers';
import { call, put, take } from 'redux-saga/effects';
import { setCurrentNetwork } from '../../actions/blockchain/currentNetwork';
import ProviderManager from '../../blockchain/ProviderManager';

export default function* initializeSaga() {
    const initializeAction = yield take(INITIALIZE);

    /*try {
        const provider = new providers.InfuraProvider();

        ProviderManager.setProvider(
            'ethereum',
            '1',
            provider,
        );

        ProviderManager.setSigner(
            'ethereum',
            '1',
            provider.getSigner(),
        );

        yield put(setCurrentNetwork('ethereum', '1'));
    } catch (error) {
        //
    }*/

    const network = initializeAction.payload.ethereum.networkVersion;

    try {
        const provider = new providers.Web3Provider(initializeAction.payload.ethereum);

        ProviderManager.setProvider(
            'ethereum',
            network,
            provider,
        );

        ProviderManager.setSigner(
            'ethereum',
            network,
            provider.getSigner(),
        );

        yield put(setCurrentNetwork('ethereum', network));
    } catch (error) {
        //
    }
}
