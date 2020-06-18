import DidDocument from "account/identity/DidDocument";

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

const formatIdentity = (didDocument: DidDocument) => {
    const didObject = didDocument.getDidObject();

    const result = {
        id: didObject.id,
        controller: didObject.controller,
        created: didObject.created,
        authentications: stringToReference(didObject.authentication),
        publicKeys: stringToReference(didObject.publicKey),
        services: stringToReference(didObject.service),
        updated: didObject.updated,
    };

    return result;
};

export default formatIdentity;
