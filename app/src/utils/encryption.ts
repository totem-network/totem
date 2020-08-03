import { Signer } from '@ethersproject/abstract-signer';
import { hexlify } from '@ethersproject/bytes';
import {
    entropyToMnemonic,
    HDNode,
    mnemonicToSeed,
} from '@ethersproject/hdnode';
import { sha256 } from '@ethersproject/sha2';
import {
    box,
    BoxKeyPair,
    randomBytes,
    secretbox,
} from 'tweetnacl';

export const ENTROPY_MESSAGE = 'vinyai';

export const BASE_PATH = "m/44'/60'/0'/0";

export const getSeedFromWeb3Signer = async (web3Signer: Signer): Promise<string> => {
    const signedEntropy = await web3Signer.signMessage(ENTROPY_MESSAGE);
    const entropy = sha256(hexlify(signedEntropy));

    const seed = mnemonicToSeed(
        entropyToMnemonic(entropy),
    );

    return seed;
};

export const deriveSigningKeyFromSeed = (seed: string, path: string = BASE_PATH): HDNode => {
    const baseNode = HDNode.fromSeed(seed).derivePath(path);

    return baseNode.derivePath('0');
};

export const deriveAsymetricKeyPairFromSeed = (seed: string, path: string = BASE_PATH): BoxKeyPair => {
    const baseNode = HDNode.fromSeed(seed).derivePath(path);

    const secretKey = Buffer.from(baseNode.derivePath('1').privateKey.slice(2), 'hex');

    const keyPair = box.keyPair.fromSecretKey(secretKey);

    return keyPair;
};

export const generateRandomNonce = () => {
    return randomBytes(24);
};

export const calculateNonce = (sealedPublicKey: Uint8Array, publicKey: Uint8Array): Uint8Array => {
    const combinedKeys = new Uint8Array(sealedPublicKey.length + publicKey.length);
    combinedKeys.set(sealedPublicKey);
    combinedKeys.set(publicKey, sealedPublicKey.length);

    const hash = sha256(combinedKeys);
    const hashBuffer = Buffer.from(
        hash.slice(2, box.nonceLength + 2) + hash.slice(2, box.nonceLength + 2),
        'hex',
    );

    return new Uint8Array(hashBuffer);
};

export const generateSecretBoxKey = () => {
    return randomBytes(secretbox.keyLength);
};

export const sealedBox = {

    open: (sealedMessage: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array): Uint8Array | null => {
        const sealedPublicKey = sealedMessage.subarray(0, box.publicKeyLength);
        const nonce = calculateNonce(sealedPublicKey, publicKey);

        const encryptedMessage = sealedMessage.subarray(box.publicKeyLength);
        return box.open(encryptedMessage, nonce, sealedPublicKey, privateKey);
    },

    seal: (message: Uint8Array, publicKey: Uint8Array): Uint8Array => {
        const sealed = new Uint8Array(box.publicKeyLength + box.overheadLength + message.length);

        const sealedKeyPair = box.keyPair();
        sealed.set(sealedKeyPair.publicKey);

        const nonce = calculateNonce(sealedKeyPair.publicKey, publicKey);
        const encryptedMessage = box(message, nonce, publicKey, sealedKeyPair.secretKey);
        sealed.set(encryptedMessage, box.publicKeyLength);

        return sealed;
    },

};
