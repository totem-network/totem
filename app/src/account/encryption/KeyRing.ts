import { BlockchainProviderManager } from 'network';
import { box, BoxKeyPair } from 'tweetnacl';
import { deriveAsymetricKeyPairFromSeed, getSeedFromWeb3Signer } from 'utils/encryption';

interface IKeyPairNetworks {
    [key: string]: BoxKeyPair;
}

interface IKeyPairs {
    [key: string]: IKeyPairNetworks;
}

class KeyRing {

    protected keyPairs: IKeyPairs;

    constructor() {
        this.keyPairs = {};
    }

    // TODO: save to local storage and load

    public async getAsymetricKeyPair(platform: string, network: string): Promise<BoxKeyPair | undefined> {

        // TODO: try to get from local storage first
        if (!this.keyPairs[platform]) {
            this.keyPairs[platform] = {};
        }

        if (!this.keyPairs[platform][network]) {
            const web3Signer = await BlockchainProviderManager.getSigner(platform, network);

            if (!web3Signer) {
                return;
            }

            const seed = await getSeedFromWeb3Signer(web3Signer);

            this.keyPairs[platform][network] = deriveAsymetricKeyPairFromSeed(seed);
        }

        return this.keyPairs[platform][network];
    }

}

export default new KeyRing();
