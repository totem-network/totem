import { Signer } from 'ethers/abstract-signer';
import { HDNode } from 'ethers/utils/hdnode';
import { box, BoxKeyPair } from 'tweetnacl';
import {
    deriveAsymetricKeyPairFromSeed,
    deriveSigningKeyFromSeed,
    getSeedFromWeb3Signer,
} from 'utils/encryption';

interface IAsymetricKeyPairs {
    [key: string]: BoxKeyPair;
}

interface ISigningKeyPairs {
    [key: string]: HDNode;
}

interface ISeeds {
    [key: string]: string;
}

class KeyRing {

    protected asymetricKeyPairs: IAsymetricKeyPairs;

    protected signingKeyPairs: ISigningKeyPairs;

    protected seeds: ISeeds;

    constructor() {
        this.asymetricKeyPairs = {};
        this.signingKeyPairs = {};
        this.seeds = {};
    }

    public async getAsymetricKeyPair(signer: Signer): Promise<BoxKeyPair | undefined> {
        const address = await signer.getAddress();

        if (!this.asymetricKeyPairs[address]) {
            const seed = await this.getSeed(signer);

            if (!seed) {
                return;
            }

            this.asymetricKeyPairs[address] = deriveAsymetricKeyPairFromSeed(seed);
        }

        return this.asymetricKeyPairs[address];
    }

    public async getSigningKeyPair(signer: Signer): Promise<HDNode | undefined> {
        const address = await signer.getAddress();

        if (!this.signingKeyPairs[address]) {
            const seed = await this.getSeed(signer);

            if (!seed) {
                return;
            }

            this.signingKeyPairs[address] = deriveSigningKeyFromSeed(seed);
        }

        return this.signingKeyPairs[address];
    }

    public async getSeed(signer: Signer): Promise<string | undefined> {
        const address = await signer.getAddress();
        // TODO: try to get from local storage first
        // TODO: save to local storage and load
        if (!this.seeds[address]) {
            this.seeds[address] = await getSeedFromWeb3Signer(signer);
        }

        return this.seeds[address];
    }

}

export default new KeyRing();
