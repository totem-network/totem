import IPFS from 'ipfs';

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
            return;
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
                // TODO: different IPFS networks
            }

            return new IPFS();
        }

        return;
    }

}

export default new ProviderManager();