import {
    createJWT,
    SimpleSigner,
} from 'did-jwt';
import { secretbox } from 'tweetnacl';
import { decodeBase64, decodeUTF8, encodeBase64, encodeUTF8 } from 'tweetnacl-util';
import {
    deriveAsymetricKeyPairFromSeed,
    deriveSigningKeyFromSeed,
    generateRandomNonce,
    generateSecretBoxKey,
    sealedBox,
} from 'utils/encryption';
import DidDocument from './DidDocument';
const Identities = require('orbit-db-identity-provider');

export interface IFile {
    data: string;
    name: string;
}

export interface IEncryptedFiles {
    files: IFile[];
    keys: string[];
    secretKey?: Uint8Array;
}

class Identity {

    protected did: DidDocument;

    protected seed: string;

    constructor(did: DidDocument, seed: string) {
        this.did = did;
        this.seed = seed;
    }

    public async sign(payload: any, options: any): Promise<string> {
        const signingKey = deriveSigningKeyFromSeed(this.seed);

        const JWTSigner = SimpleSigner(signingKey.privateKey.slice(2));
        const issuer = signingKey.publicKey.slice(2);

        console.log(issuer);

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

        // TODO: only push if not already in array
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

    public async getDid() {
        return this.did;
    }

    public async getOrbitDbIdentity() {
        return Identities.createIdentity({
            identity: this,
            type: 'VinyaiID',
        });
    }

}

export default Identity;
