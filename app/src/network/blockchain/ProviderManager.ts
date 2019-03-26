import { providers, Signer } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';

// const ProviderBridge = require('ethers-provider-bridge');

interface IProviderNetworks {
    [key: string]: Provider;
}

interface IProviders {
    [key: string]: IProviderNetworks;
}

interface ISignerNetworks {
    [key: string]: Signer;
}

interface ISigners {
    [key: string]: ISignerNetworks;
}

class ProviderManager {

    protected providers: IProviders;

    protected signers: ISigners;

    constructor() {
        this.providers = {};
        this.signers = {};
    }

    public setProvider(
        platform: string,
        network: string,
        provider: Provider,
    ): ProviderManager {
        if (!this.providers[platform]) {
            this.providers[platform] = {};
        }

        this.providers[platform][network] = provider;

        return this;
    }

    public getProvider(platform: string, network: string): Provider | undefined {
        if (!this.providers[platform]) {
            return;
        }

        if (!this.providers[platform][network]) {
            const provider = this.createProvider(platform, network);
            if (provider) {
                this.providers[platform][network] = provider;
            }
        }

        return this.providers[platform][network];
    }

    public bridgeProvider(provider: Provider, signer: Signer) {
        // TODO: metamask as a signer
        // return new ProviderBridge(provider, signer);
    }

    public setSigner(
        platform: string,
        network: string,
        signer: Signer,
    ): ProviderManager {
        if (!this.signers[platform]) {
            this.signers[platform] = {};
        }

        this.signers[platform][network] = signer;

        return this;
    }

    public getSigner(platform: string, network: string): Signer | undefined {
        if (!this.signers[platform]) {
            return;
        }

        if (!this.signers[platform][network]) {
            return;
        }

        return this.signers[platform][network];
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
