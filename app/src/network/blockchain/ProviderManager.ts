import { InfuraProvider } from '@ethersproject/providers';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';

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
        chainId: string,
        provider: Provider,
    ): ProviderManager {
        this.providers[chainId] = provider;

        return this;
    }

    public async getProvider(chainId: string): Promise<Provider | undefined> {
        if (!this.providers[chainId]) {
            const provider = await this.createProvider(chainId);

            if (provider) {
                this.providers[chainId] = provider;
            }
        }

        return this.providers[chainId];
    }

    public setSigner(
        chainId: string,
        signer: Signer,
    ): ProviderManager {
        this.signers[chainId] = signer;

        return this;
    }

    public async getSigner(chainId: string): Promise<Signer | undefined> {
        return this.signers[chainId];
    }

    protected async createProvider(chainId: string): Promise<Provider | undefined> {
        const [namespace, reference] = chainId.split(':');

        if (namespace === 'eip155') {
            if (reference === '1') {
                return new InfuraProvider();
            }

            if (reference === '3') {
                return new InfuraProvider('ropsten');
            }

            if (reference === '4') {
                return new InfuraProvider('rinkeby');
            }
        }

        if (namespace === 'bip122') {
            // TODO: bitcoin, litecoin, ...
        }

        return;
    }

}

export default new ProviderManager();
