import { KeyRing } from 'account';
import { box, BoxKeyPair, secretbox } from 'tweetnacl';
import { decodeBase64, decodeUTF8, encodeBase64, encodeUTF8 } from 'tweetnacl-util';
import { getCurrentNetwork } from 'utils/blockchain';
import {
    generateRandomNonce,
    generateSecretBoxKey,
    sealedBox,
} from 'utils/encryption';

interface IFile {
    data: string;
    name: string;
}

interface IEncryptedFiles {
    files: IFile[];
    keys: string[];
    secretKey: Uint8Array;
}

export const encryptFile = (file: IFile, publicKeys: Uint8Array[], secretKey?: Uint8Array) => {
    const result = encryptFiles([file], publicKeys, secretKey);

    return {
        file: result.files[0],
        keys: result.keys,
    };
};

export const encryptFiles = (files: IFile[], publicKeys: Uint8Array[], secretKey?: Uint8Array): IEncryptedFiles => {
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
};

export const decryptFiles = ({ files, keys }: IEncryptedFiles, privateKey: Uint8Array): IFile[] => {
    const keyPair = box.keyPair.fromSecretKey(privateKey);

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
};

// TODO: add key and remove key
