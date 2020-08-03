import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import KeyRing from 'account/encryption/KeyRing';
import { encodeBase64 } from 'tweetnacl-util';
import didCache from '../identity/DidCache';
import DidDocument from '../identity/DidDocument';
import DidRegistry from '../identity/DidRegistry';
import Identity from './Identity';
import Profile from './Profile';
import PublicProfile from './PublicProfile';

export interface IProfileOptions {
    name?: string;
}

class IdentityManager {

    protected ipfs: any;

    protected signer: Signer;

    protected provider: Provider;

    protected didRegistry: DidRegistry;

    constructor(ipfs: any, signer: Signer, provider: Provider) {
        this.ipfs = ipfs;
        this.signer = signer;
        this.provider = provider;
        this.didRegistry = new DidRegistry(ipfs, provider, signer, didCache);
    }

    public async createIdentity(options?: IProfileOptions) {
        const didOptions = {};

        const address = await this.signer.getAddress();

        const seed = await KeyRing.getSeed(this.signer);

        if (!seed) {
            return;
        }

        const didDocument = new DidDocument(address, didOptions);
        const did = didDocument.getId();

        const encryptionKeyPair = await KeyRing.getAsymetricKeyPair(this.signer);
        if (!encryptionKeyPair) {
            return;
        }   

        const encodedPublicEncryptionKey = encodeBase64(encryptionKeyPair.publicKey);

        didDocument.addPublicKey({
            controller: did,
            id: `encryption-${encodedPublicEncryptionKey}`,
            publicKey: encodedPublicEncryptionKey,
            publicKeyType: 'publicKeyBase64',
            type: 'Curve25519EncryptionPublicKey',
        });

        const signingKeyPair = await KeyRing.getSigningKeyPair(this.signer);
        if (!signingKeyPair) {
            return;
        }

        didDocument.addPublicKey({
            controller: did,
            id: `signing-${signingKeyPair.publicKey.slice(2)}`,
            publicKey: signingKeyPair.publicKey.slice(2),
            publicKeyType: 'publicKeyHex',
            type: 'Secp256k1VerificationKey2018',
        });

        didDocument.addAuthentication({
            id: `signing-${signingKeyPair.publicKey.slice(2)}`,
            type: 'Secp256k1VerificationKey2018',
        });

        if (!await Profile.createProfile(didDocument)) {
            return;
        }

        // didDocument.generateProof(this.signer);

        const transaction = await this.didRegistry.create(didDocument);

        const identity = new Identity(didDocument, seed);

        if (options) {
            const profile = await this.loadProfile(identity);

            if (profile) {
                if (options.name) {
                    await profile.setPublic('name', options.name);
                }
            }
        }

        return {
            identity,
            transaction,
        };
    }

    public async loadIdentity() {
        const address = await this.signer.getAddress();

        const seed = await KeyRing.getSeed(this.signer);

        const didDocument = await this.didRegistry.read(`did:vinyai:${address}`);

        if (!didDocument || !seed) {
            return;
        }

        const identity = new Identity(didDocument, seed);

        return identity;
    }

    public async loadProfile(identity: Identity) {
        const profile = new Profile(identity);

        if (!await profile.initDatabases()) {
            return;
        }

        return profile;
    }

    public async loadPublicProfile(address: string) {
        const didDocument = await this.didRegistry.read(`did:vinyai:${address}`);

        if (!didDocument) {
            return;
        }

        const profile = new PublicProfile(didDocument);

        if (!await profile.initDatabases()) {
            return;
        }

        return profile;
    }

}

export default IdentityManager;
