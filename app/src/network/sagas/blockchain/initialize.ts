import { INITIALIZE } from 'app/actions/initialize';
import coinTypes from 'bip44-constants';
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

    try {
        const ethereum = coinTypes.filter((item: any) => item[1] === 'ETH');

        const provider = new providers.Web3Provider(initializeAction.payload.ethereum);
        const network = yield provider.getNetwork();

        ProviderManager.setProvider(
            ethereum[0][0],
            network.chainId,
            provider,
        );

        ProviderManager.setSigner(
            ethereum[0][0],
            network.chainId,
            provider.getSigner(),
        );

        yield put(setCurrentNetwork(
            ethereum[0][0],
            network.chainId,
            network.name,
        ));
    } catch (error) {
        //
    }
}
