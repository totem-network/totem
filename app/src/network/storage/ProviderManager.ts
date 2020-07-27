import Ipfs from 'ipfs';

interface IProviderNetworks {
    [key: string]: any;
}

interface IProviders {
    [key: string]: IProviderNetworks;
}

class ProviderManager {

    protected providers: IProviders;

    constructor() {
        this.providers = {};

        this.setProvider = this.setProvider.bind(this);
        this.getProvider = this.getProvider.bind(this);
    }

    public setProvider(
        platform: string,
        network: string,
        provider: any,
    ): ProviderManager {
        if (!this.providers[platform]) {
            this.providers[platform] = {};
        }

        this.providers[platform][network] = provider;

        return this;
    }

    public async getProvider(platform: string, network: string): Promise<any | undefined> {
        if (!this.providers[platform]) {
            this.providers[platform] = {};
        }

        if (!this.providers[platform][network]) {
            const provider = await this.createProvider(platform, network);
            if (provider) {
                this.providers[platform][network] = provider;
            }
        }

        return this.providers[platform][network];
    }

    protected async createProvider(platform: string, network: string): Promise<any | undefined> {
        if (platform === 'ipfs') {
            if (network === '1') {
                // TODO: different Ipfs networks
            }

            const node = await Ipfs.create({
                EXPERIMENTAL: { pubsub: true },
                repo: 'vinyai',
            });

            return node;

            // TODO: for ipfs version >= 0.37
            /*return Ipfs.create({
                EXPERIMENTAL: { pubsub: true },
            });*/
        }

        return;
    }

}

export default new ProviderManager();
