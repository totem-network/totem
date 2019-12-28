import coinTypes from 'bip44-constants';
import { providers, Signer } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';

// const ProviderBridge = require('ethers-provider-bridge');

interface IProviders {
    [key: string]: Provider;
}

interface ISigners {
    [key: string]: Signer;
}

class ProviderManager {

    protected providers: IProviders;

    protected signers: ISigners;

    constructor() {
        this.providers = {};
        this.signers = {};

        this.setProvider = this.setProvider.bind(this);
        this.getProvider = this.getProvider.bind(this);

        this.setSigner = this.setSigner.bind(this);
        this.getSigner = this.getSigner.bind(this);
    }

    public setProvider(
        coinType: string,
        provider: Provider,
    ): ProviderManager {
        this.providers[coinType] = provider;

        return this;
    }

    public async getProvider(coinType: string): Promise<Provider | undefined> {
        if (!this.providers[coinType]) {
            const provider = await this.createProvider(coinType);
            if (provider) {
                this.providers[coinType] = provider;
            }
        }

        return this.providers[coinType];
    }

    public bridgeProvider(provider: Provider, signer: Signer) {
        // TODO: metamask as a signer
        // return new ProviderBridge(provider, signer);
    }

    public setSigner(
        coinType: string,
        signer: Signer,
    ): ProviderManager {
        this.signers[coinType] = signer;

        return this;
    }

    public async getSigner(coinType: string): Promise<Signer | undefined> {
        if (!this.signers[coinType]) {
            return;
        }

        return this.signers[coinType];
    }

    protected async createProvider(coinType: string): Promise<Provider | undefined> {
        const ethereum = coinTypes.filter((item: any) => item[1] === 'ETH');

        if (ethereum.length === 1) {
            if (coinType === ethereum[0][0]) {
                return new providers.InfuraProvider();
            }
        }

        return;
    }

}

export default new ProviderManager();
