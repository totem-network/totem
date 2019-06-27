import { BlockchainProviderManager, currentNetworkSelector } from 'network';
import { store } from 'state';

export const getCurrentNetworkSigner = async () => {
    const state = store.getState();
    const currentNetwork = currentNetworkSelector(state);

    const web3Signer = await BlockchainProviderManager.getSigner(
        currentNetwork.platform,
        currentNetwork.network,
    );

    return web3Signer;
};

export const getCurrentNetworkProvider = async () => {
    const state = store.getState();
    const currentNetwork = currentNetworkSelector(state);

    const web3Provider = await BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    return web3Provider;
};
