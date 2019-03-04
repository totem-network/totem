import { providers, Signer } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';

// const ProviderBridge = require('ethers-provider-bridge');

interface INetworks {
    [key: string]: Provider;
}

interface IPlatforms {
    [key: string]: INetworks;
}

class ProviderManager {

    protected platforms: IPlatforms;

    constructor() {
        this.platforms = {};
    }

    public setProvider(
        platform: string,
        network: string,
        provider: Provider,
    ): ProviderManager {
        if (!this.platforms[platform]) {
            this.platforms[platform] = {};
        }

        this.platforms[platform][network] = provider;

        return this;
    }

    public getProvider(platform: string, network: string): Provider | undefined {
        if (!this.platforms[platform]) {
            return;
        }

        if (!this.platforms[platform][network]) {
            const provider = this.createProvider(platform, network);
            if (provider) {
                this.platforms[platform][network] = provider;
            }
        }

        return this.platforms[platform][network];
    }

    public bridgeProvider(provider: Provider, signer: Signer) {
        // TODO: metamask as a signer
        // return new ProviderBridge(provider, signer);
    }

    protected createProvider(platform: string, network: string): Provider | undefined {
        if (platform === 'ethereum') {
            if (network === '1') {
                return new providers.InfuraProvider();
            }
        }

        return;
    }

}

export default new ProviderManager();
