import { Signer } from 'ethers/abstract-signer';
import { box, BoxKeyPair } from 'tweetnacl';
import { deriveAsymetricKeyPairFromSeed, getSeedFromWeb3Signer } from 'utils/encryption';

interface IKeyPairs {
    [key: string]: IKeyPairChains;
}

interface IKeyPairChains {
    [key: string]: BoxKeyPair;
}

interface ISeeds {
    [key: string]: ISeedChains;
}

interface ISeedChains {
    [key: string]: string;
}

class KeyRing {

    protected keyPair?: BoxKeyPair;

    protected seed?: string;

    public async getAsymetricKeyPair(signer: Signer): Promise<BoxKeyPair | undefined> {
        if (!this.keyPair) {
            const seed = await this.getSeed(signer);

            if (!seed) {
                return;
            }

            this.keyPair = deriveAsymetricKeyPairFromSeed(seed);
        }

        return this.keyPair;
    }

    public async getSeed(signer: Signer): Promise<string | undefined> {
        // TODO: try to get from local storage first
        // TODO: save to local storage and load
        if (!this.seed) {

            const seed = await getSeedFromWeb3Signer(signer);

            this.seed = seed;
        }

        return this.seed;
    }

}

export default new KeyRing();
