import { KeyRing } from 'account';
import {
    createJWT,
    SimpleSigner,
} from 'did-jwt';
import { box, BoxKeyPair, secretbox } from 'tweetnacl';
import { decodeBase64, decodeUTF8, encodeBase64, encodeUTF8 } from 'tweetnacl-util';
import {
    deriveAsymetricKeyPairFromSeed,
    deriveSigningKeyFromSeed,
    generateRandomNonce,
    generateSecretBoxKey,
    getSeedFromWeb3Signer,
    sealedBox,
} from 'utils/encryption';
const DidDocument = require('ipfs-did-document');
const Identities = require('orbit-db-identity-provider');

interface IFile {
    data: string;
    name: string;
}

interface IEncryptedFiles {
    files: IFile[];
    keys: string[];
    secretKey: Uint8Array;
}

class Identity {

    public static async create(ipfs: any, coinType: string) {
        const seed = await KeyRing.getSeed(coinType);

        if (!seed) {
            throw new Error('Cannot create identity! No seed for given coin type');
        }

        return new Identity(ipfs, seed);
    }

    protected did: any;

    protected ipfs: any;

    protected seed: string;

    constructor(ipfs: any, seed: string) {
        this.seed = seed;
        this.ipfs = ipfs;
    }

    public async sign(payload: any, options: any): Promise<string> {
        const signingKey = deriveSigningKeyFromSeed(this.seed);

        const JWTSigner = SimpleSigner(signingKey.privateKey.slice(2));
        const issuer = signingKey.publicKey.slice(2);

        return createJWT(payload, {
            issuer,
            signer: JWTSigner,
        });
    }

    public encrypt(files: IFile[], publicKeys?: Uint8Array[], secretKey?: Uint8Array) {
        const keyPair = deriveAsymetricKeyPairFromSeed(this.seed);

        if (!publicKeys) {
            publicKeys = [];
        }

        publicKeys.push(keyPair.publicKey);

        if (!secretKey) {
            secretKey = generateSecretBoxKey();
        }

        const encryptedFiles = [];

        for (const file of files) {
            const fileNonce = generateRandomNonce();

            const encryptedData = secretbox(
                decodeUTF8(file.data),
                fileNonce,
                secretKey,
            );

            const fileJson = {
                data: encodeBase64(encryptedData),
                nonce: encodeBase64(fileNonce),
            };

            encryptedFiles.push({
                data: JSON.stringify(fileJson),
                name: file.name,
            });
        }

        const keys = [];

        for (const publicKey of publicKeys) {
            const encryptedKey = sealedBox.seal(secretKey, publicKey);

            const keyJson = {
                key: encodeBase64(encryptedKey),
            };

            keys.push(JSON.stringify(keyJson));
        }

        return  {
            files: encryptedFiles,
            keys,
            secretKey,
        };
    }

    public decrypt({ files, keys }: IEncryptedFiles) {
        const keyPair = deriveAsymetricKeyPairFromSeed(this.seed);

        const fileKey = new Uint8Array(32);
        for (const encryptedKeyJSON of keys) {
            const encryptedKey = JSON.parse(encryptedKeyJSON);

            if (!encryptedKey.key) {
                continue;
            }

            const openResult = sealedBox.open(
                decodeBase64(encryptedKey.key),
                keyPair.publicKey,
                keyPair.secretKey,
            );

            if (openResult) {
                fileKey.set(openResult);
                break;
            }
        }

        if (fileKey.length === 0) {
            return [];
        }

        const decryptedFiles = [];

        for (const file of files) {
            const {
                data,
                nonce,
            } = JSON.parse(file.data);

            const decodedData = decodeBase64(data);
            const decodedNonce = decodeBase64(nonce);

            const decryptedFile = secretbox.open(
                decodedData,
                decodedNonce,
                fileKey,
            );

            if (!decryptedFile) {
                continue;
            }

            decryptedFiles.push({
                data: encodeUTF8(decryptedFile),
                name: file.name,
            });
        }

        return decryptedFiles;
    }

    // TODO: add or remove keys from encrypted files -> should get called by AccessController.grant(permission)

    public async getDID() {
        if (!this.did) {
            const doc = new DidDocument(this.ipfs, 'TotemID');

            const signingKeyPair = deriveSigningKeyFromSeed(this.seed);
            doc.addPublicKey(
                'signingKey',
                'Secp256k1VerificationKey2018',
                'publicKeyHex',
                signingKeyPair.publicKey,
            );

            const encryptionKeyPair = deriveAsymetricKeyPairFromSeed(this.seed);
            doc.addPublicKey(
                'encryptionKey',
                'Curve25519EncryptionPublicKey',
                'publicKeyBase64',
                encryptionKeyPair.publicKey,
            );

            // TODO: seperate management key??
            doc.addPublicKey(
                'managementKey',
                'Secp256k1VerificationKey2018',
                'ethereumAddress',
                signingKeyPair.publicKey,
            );

            doc.addAuthentication('Secp256k1SignatureAuthentication2018', 'signingKey');

            await doc.commit({ noTimestamp: true });

            this.did = doc.DID;
        }

        return this.did;
    }

    public async getOrbitDbIdentity() {
        return Identities.createIdentity({
            identity: this,
            type: 'TotemID',
        });
    }

}

export default Identity;
