import { BlockchainProviderManager, currentNetworkSelector } from 'network';
import { store } from 'state';

export const getCurrentNetwork = () => {
    const state = store.getState();
    return currentNetworkSelector(state);
};

export const getCurrentNetworkSigner = async () => {
    const currentNetwork = getCurrentNetwork();

    const web3Signer = await BlockchainProviderManager.getSigner(
        currentNetwork.platform,
        currentNetwork.network,
    );

    return web3Signer;
};

export const getCurrentNetworkProvider = async () => {
    const currentNetwork = getCurrentNetwork();

    const web3Provider = await BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    return web3Provider;
};
