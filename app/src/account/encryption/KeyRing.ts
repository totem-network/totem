import { BlockchainProviderManager } from 'network';
import { box, BoxKeyPair } from 'tweetnacl';
import { deriveAsymetricKeyPairFromSeed, getSeedFromWeb3Signer } from 'utils/encryption';

interface IKeyPairs {
    [key: string]: BoxKeyPair;
}

interface ISeeds {
    [key: string]: string;
}

class KeyRing {

    protected keyPairs: IKeyPairs;

    protected seeds: ISeeds;

    constructor() {
        this.keyPairs = {};
        this.seeds = {};
    }

    public async getAsymetricKeyPair(coinType: string): Promise<BoxKeyPair | undefined> {
        if (!this.keyPairs[coinType]) {
            const web3Signer = await BlockchainProviderManager.getSigner(coinType);

            if (!web3Signer) {
                return;
            }

            const seed = await this.getSeed(coinType);

            if (!seed) {
                return;
            }

            this.keyPairs[coinType] = deriveAsymetricKeyPairFromSeed(seed);
        }

        return this.keyPairs[coinType];
    }

    public async getSeed(coinType: string): Promise<string | undefined> {
        // TODO: try to get from local storage first
        // TODO: save to local storage and load
        if (!this.seeds[coinType]) {
            const web3Signer = await BlockchainProviderManager.getSigner(coinType);

            if (!web3Signer) {
                return;
            }

            const seed = await getSeedFromWeb3Signer(web3Signer);

            this.seeds[coinType] = seed;
        }

        return this.seeds[coinType];
    }

}

export default new KeyRing();
