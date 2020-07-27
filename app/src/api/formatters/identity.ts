import DidDocument from "account/identity/DidDocument";

/**
 * Formats reference DIDs from string to an object with
 * the DID as the `reference` attribute, because GraphQL
 * does not allow String as a union type.
 * @param {any[]} values - An array of authentications,
 * public keys or services
 * @returns {any[]} - values with all strings replaced
 * by reference objects
 */
const stringToReference = (values: any[]) => {
    const result = [];

    for (let value of values) {
        if (typeof value !== 'string') {
            result.push(value);
            continue;
        }

        result.push({
            reference: value,
        });
    }

    return result;
};

/**
 * Takes a DID Document and formats it to be used as a
 * GraphQL result
 * @param {DidDocument} didDocument - DID Document to format
 * for GraphQL
 * @returns {object} - Plain JavaScript object formatted for
 * GraphQL
 */
const formatIdentity = (didDocument: DidDocument) => {
    const didObject = didDocument.getDidObject();

    const result = {
        id: didObject.id,
        controller: didObject.controller,
        created: didObject.created,
        authentications: didObject.authentication,
        publicKeys: stringToReference(didObject.publicKey),
        services: stringToReference(didObject.service),
        updated: didObject.updated,
    };

    return result;
};

export default formatIdentity;
