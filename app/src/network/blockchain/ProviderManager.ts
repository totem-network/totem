import coinTypes from 'bip44-constants';
import { providers, Signer } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';

interface IProviders {
    [key: string]: IProviderChains;
}

interface IProviderChains {
    [key: string]: Provider;
}

interface ISigners {
    [key: string]: ISignerChains;
}

interface ISignerChains {
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
        chainId: any,
        provider: Provider,
    ): ProviderManager {
        if (!this.providers[coinType]) {
            this.providers[coinType] = {};
        }

        this.providers[coinType][chainId] = provider;

        return this;
    }

    public async getProvider(coinType: string, chainId: any): Promise<Provider | undefined> {
        if (!this.providers[coinType]) {
            this.providers[coinType] = {};

            const provider = await this.createProvider(coinType, chainId);

            if (provider) {
                this.providers[coinType][chainId] = provider;
            }
        }

        return this.providers[coinType][chainId];
    }

    public setSigner(
        coinType: string,
        chainId: any,
        signer: Signer,
    ): ProviderManager {
        if (!this.signers[coinType]) {
            this.signers[coinType] = {};
        }

        this.signers[coinType][chainId] = signer;

        return this;
    }

    public async getSigner(coinType: string, chainId: any): Promise<Signer | undefined> {
        if (!this.signers[coinType]) {
            return;
        }

        if (!this.signers[coinType][chainId]) {
            return;
        }

        return this.signers[coinType][chainId];
    }

    protected async createProvider(coinType: string, chainId: any): Promise<Provider | undefined> {
        const ethereum = coinTypes.filter((item: any) => item[1] === 'ETH');

        if (ethereum.length === 1) {
            if (coinType === ethereum[0][0]) {
                if (chainId === 1) {
                    return new providers.InfuraProvider();
                }

                if (chainId === 3) {
                    return new providers.InfuraProvider('ropsten');
                }

                if (chainId === 4) {
                    return new providers.InfuraProvider('rinkeby');
                }
            }
        }

        return;
    }

}

export default new ProviderManager();
