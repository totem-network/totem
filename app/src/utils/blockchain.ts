import BlockchainProviderManager from 'network/blockchain/ProviderManager';
import currentNetworkSelector from 'network/selectors/blockchain/currentNetwork';
import { store } from 'state';

export const getCurrentNetwork = () => {
    const state = store.getState();
    return currentNetworkSelector(state);
};

export const getCurrentNetworkSigner = async () => {
    const currentNetwork = getCurrentNetwork();

    const web3Signer = await BlockchainProviderManager.getSigner(
        currentNetwork.chainId,
    );

    return web3Signer;
};

export const getCurrentNetworkProvider = async () => {
    const currentNetwork = getCurrentNetwork();

    const web3Provider = await BlockchainProviderManager.getProvider(
        currentNetwork.chainId,
    );

    return web3Provider;
};
