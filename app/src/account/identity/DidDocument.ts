import formatISO from 'date-fns/formatISO';

// TODO: all key types or only the one vinyai uses? see IPublicKey and IAuthentication too
export type PublicKeyType =
    'publicKeyPem' |
    'publicKeyJwk' |
    'publicKeyHex' |
    'publicKeyBase64' |
    'publicKeyBase58' |
    'publicKeyMultibase' |
    'ethereumAddress';

export interface IPublicKeyOptions {
    controller: string,
    id: string,
    publicKey: string,
    publicKeyType: PublicKeyType,
    type: string,
}

export interface IPublicKey {
    controller: string;
    id: string;
    type: string;
    publicKeyPem?: string;
    publicKeyJwk?: string;
    publicKeyHex?: string;
    publicKeyBase64?: string;
    publicKeyBase58?: string;
    publicKeyMultibase?: string;
    ethereumAddress?: string;
}

export interface IAuthenticationOptions {
    controller: string,
    id: string,
    publicKey: string,
    publicKeyType: PublicKeyType,
    type: string,
}

export interface IAuthentication {
    controller: string;
    id: string;
    type: string;
    publicKeyPem?: string;
    publicKeyJwk?: string;
    publicKeyHex?: string;
    publicKeyBase64?: string;
    publicKeyBase58?: string;
    publicKeyMultibase?: string;
    ethereumAddress?: string;
}

export interface IService {
    id: string;
    serviceEndpoint: string; // TODO: can be a JSON-LD object too
    type: string;
    [key: string]: any;
}

export interface IProof {
    type: string;
    proofPurpose: string;
    verificationMethod: string;
    created: string;
    domain?: string;
    jws: string;
}

class DidDocument {

    static readonly CONTEXT = 'https://www.w3.org/ns/did/v1';

    static readonly METHOD = 'vinyai';

    protected address: string;

    protected controller: string;

    protected publicKeys: (IPublicKey | string)[]

    protected authentications: (IAuthentication | string)[]

    protected services: IService[]

    protected created: string;

    protected updated: string;

    protected proof?: IProof;

    public static fromJSON(didJSON: string) {
        const parsedDid = JSON.parse(didJSON);

        if (parsedDid['@context'] !== DidDocument.CONTEXT) {
            return;
        }

        const idParts = parsedDid.id.split(':');

        if (
            idParts[0] !== 'did' ||
            idParts[1] !== DidDocument.METHOD ||
            !idParts[2]
        ) {
            return;
        }

        const address = idParts[2];
        const options: any = {};

        if (parsedDid.controller) {
            options.controller = parsedDid.controller;
        }

        if (parsedDid.publicKey) {
            options.publicKeys = parsedDid.publicKey;
        }

        if (parsedDid.authentication) {
            options.authentications = parsedDid.authentication;
        }

        if (parsedDid.service) {
            options.services = parsedDid.service;
        }

        if (
            !parsedDid.created ||
            !parsedDid.updated/* ||
            !parsedDid.proof*/
        ) {
            return;
        }

        options.created = parsedDid.created;
        options.updated = parsedDid.updated;
        options.proof = parsedDid.proof;

        const didDocument = new DidDocument(address, options);

        // if (!didDocument.isValid()) {
        //     return;
        // }

        return didDocument;
    }

    constructor(address: string, options: any) {
        this.address = address;
        this.controller = options.controller || this.getId();
        this.publicKeys = options.publicKeys || [];
        this.authentications = options.authentications || [];
        this.services = options.services || [];

        if (options.created) {
            this.created = options.created;
            this.updated = options.updated || options.created;
        } else {
            const now = formatISO(new Date());
            this.created = now;
            this.updated = now;
        }

        this.proof = options.proof;
    }

    public getId() {
        return `did:${DidDocument.METHOD}:${this.address}`;
    }

    public addPublicKey(publicKeyOrReference: IPublicKeyOptions | string): boolean {
        if (typeof publicKeyOrReference === 'string') {
            if (this.findPublicKey(publicKeyOrReference) !== -1) {
                return false;
            }

            this.publicKeys.push(publicKeyOrReference);
            return true;
        }

        if (this.findPublicKey(this.getId() + '#' + publicKeyOrReference.id) !== -1) {
            return false;
        }

        this.publicKeys.push({
            controller: publicKeyOrReference.controller,
            id: this.getId() + '#' + publicKeyOrReference.id,
            type: publicKeyOrReference.type,
            [publicKeyOrReference.publicKeyType]: publicKeyOrReference.publicKey,
        });

        return true;
    }

    public getPublicKey(id: string) {
        const index = this.findPublicKey(id);

        if (index === -1) {
            return false;
        }

        return this.publicKeys[index];
    }

    public getPublicKeys(type: string) {
        return this.publicKeys.filter((publicKey) => {
            if (typeof publicKey === 'string') {
                return publicKey.startsWith(type);
            }

            return publicKey.id.startsWith(type);
        });
    }

    public removePublicKey(id: string): boolean {
        const index = this.findPublicKey(id);

        if (index === -1) {
            return false;
        }

        this.publicKeys.splice(index, 1);

        return true;
    }

    public addAuthentication(authenticationOrReference: IAuthenticationOptions | string): boolean {
        if (typeof authenticationOrReference === 'string') {
            if (this.findAuthentication(authenticationOrReference) !== -1) {
                return false;
            }

            this.authentications.push(authenticationOrReference);
            return true;
        }

        if (this.findAuthentication(this.getId() + '#' + authenticationOrReference.id) !== -1) {
            return false;
        }

        this.authentications.push({
            controller: authenticationOrReference.controller,
            id: this.getId() + '#' + authenticationOrReference.id,
            type: authenticationOrReference.type,
            [authenticationOrReference.publicKeyType]: authenticationOrReference.publicKey,
        });

        return true;
    }

    public getAuthentication(id: string) {
        const index = this.findAuthentication(id);

        if (index === -1) {
            return false;
        }

        return this.authentications[index];
    }

    public getAuthentications(type: string) {
        return this.authentications.filter((authentication) => {
            if (typeof authentication === 'string') {
                return authentication.startsWith(type);
            }

            return authentication.id.startsWith(type);
        });
    }

    public removeAuthentication(id: string): boolean {
        const index = this.findAuthentication(id);

        if (index === -1) {
            return false;
        }

        this.authentications.splice(index, 1);

        return true;
    }

    public addService(service: IService): boolean {
        if (this.findService(this.getId() + '#' + service.id) !== -1) {
            return false;
        }

        service.id = this.getId() + '#' + service.id;
        this.services.push(service);

        return true;
    }

    public getService(id: string) {
        const index = this.findService(id);

        if (index === -1) {
            return false;
        }

        return this.services[index];
    }

    public getServices(type: string) {
        return this.services.filter((service) => {
            return service.type === type;
        });
    }

    public removeService(id: string): boolean {
        const index = this.findService(id);

        if (index === -1) {
            return false;
        }

        this.services.splice(index, 1);

        return true;
    }

    // Entry in registry is already a proof of ownership and integrity
    //
    // public generateProof(identity: Identity) {
    //     // TODO: circular dependency Identity -> Profile -> DidDocument -> Identity -> ...
    // }

    // public isValid(): boolean {
    //     if (!this.proof) {
    //         return false;
    //     }

    //     // TODO: check proof

    //     return true;
    // }

    public getDidObject(noProof?: boolean) {
        const didObject: any = {
            '@context': DidDocument.CONTEXT,
            id: this.getId(),
            controller: this.controller,
            publicKey: this.publicKeys,
            authentication: this.authentications,
            service: this.services,
            created: this.created,
            updated: this.updated,
        };

        if (!noProof && this.proof) {
            didObject.proof = this.proof;
        }

        return didObject;
    }

    public toJSON(noProof?: boolean): string {
        return JSON.stringify(this.getDidObject(noProof));
    }

    protected findPublicKey(id: string): number {
        return this.publicKeys.findIndex((publicKey) => {
            if (typeof publicKey === 'string') {
                return publicKey === id;
            }

            return publicKey.id === id;
        });
    }

    protected findAuthentication(id: string): number {
        return this.authentications.findIndex((authentication) => {
            if (typeof authentication === 'string') {
                return authentication === id;
            }

            return authentication.id === id;
        });
    }

    protected findService(id: string): number {
        return this.services.findIndex((service) => {
            return service.id === id;
        });
    }

}

export default DidDocument;
