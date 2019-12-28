/**
 * Based on the code of https://github.com/3box/3id-resolver
 * Licensed under MIT License with copyright belonging to 3box and their contributors
 */

import base64url from 'base64url';
import { verifyJWT } from 'did-jwt';
import { registerMethod } from 'did-resolver';
const DidDocument = require('ipfs-did-document');

const PUBKEY_IDS = ['signingKey', 'managementKey', 'encryptionKey'];
const SUB_PUBKEY_IDS = ['subSigningKey', 'subEncryptionKey'];

const register = (ipfs: any, opts = {}) => {
    registerMethod('TotemID', (_, { id }) => {
        return resolve(ipfs, id, opts as any);
    });
};

const validateDoc = (doc: any) => {
    let pubKeyIds = PUBKEY_IDS;

    if (!doc || !doc.publicKey || !doc.authentication) {
        throw new Error('Not a valid TotemID');
    }

    if (doc.root) {
        pubKeyIds = SUB_PUBKEY_IDS;
    }

    doc.publicKey.map((entry: any) => {
        const id = entry.id.split('#')[1];
        if (!pubKeyIds.includes(id)) {
            throw new Error('Not a valid 3ID');
        }
    });
};

const encodeSection = (data: any) => {
    return base64url.encode(JSON.stringify(data));
};

const verifyProof = async (subDoc: any) => {
    const subSigningKey = subDoc.publicKey.find((entry: any) => {
        return entry.id.includes(SUB_PUBKEY_IDS[0]);
    }).publicKeyHex;

    const subEncryptionKey = subDoc.publicKey.find((entry: any) => {
        return entry.id.includes(SUB_PUBKEY_IDS[1]);
    }).publicKeyBase64;

    const payload = encodeSection({
      iat: null,
      iss: subDoc.root,
      subEncryptionKey,
      subSigningKey,
    });

    const header = encodeSection({ typ: 'JWT', alg: subDoc.proof.alg });
    const jwt = `${header}.${payload}.${subDoc.proof.signature}`;

    await verifyJWT(jwt);
};

const mergeDocuments = (doc: any, subDoc: any) => {
    subDoc.publicKey = doc.publicKey.concat(subDoc.publicKey);
    return subDoc;
};

const resolve = async (ipfs: any, cid: any, { isRoot, pin }: any) => {
    let doc;

    try {
        doc = await DidDocument.cidToDocument(ipfs, cid);
        validateDoc(doc);

        if (doc.root) {
            if (isRoot) {
                throw new Error('Only one layer subDoc allowed');
            }

            const rootDoc = await resolve(ipfs, doc.root.split(':')[2], { isRoot: true });
            await verifyProof(doc);
            doc = mergeDocuments(rootDoc, doc);
        }

        if (pin) {
            await ipfs.pin.add(cid);
        }
    } catch (e) {
        try {
            await ipfs.pin.rm(cid);
            // tslint:disable-next-line:no-empty
        } catch (e) {}

        throw new Error('Invalid TotemID');
    }

    return doc;
};

export default register;
