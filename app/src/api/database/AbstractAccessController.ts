import DidRegistry from 'account/identity/DidRegistry';
const resolve = require('did-resolver').default;

interface ISaveResult {
    address: string;
}

export interface IAccessControllerOptions {
    admin?: any;
    didRegistry: DidRegistry;
    read?: any;
    write?: any;
}

export interface ICapabilities {
    admin: any;
    read: any;
    write: any;
}

abstract class AbstractAccessController {
    // TODO: see https://github.com/orbitdb/orbit-db-access-controllers/blob/master/src/contract-access-controller.js

    protected capabilities: ICapabilities;

    protected didRegistry: DidRegistry;

    constructor(options: IAccessControllerOptions) {
        this.capabilities = {
            admin: options.admin || [],
            read: options.read || [],
            write: options.write || [],
        };

        this.didRegistry = options.didRegistry;
    }

    public abstract async canAppend(entry: any, identityProvider: any): Promise<boolean>;

    public abstract async grant(capability: string, identifier: string): Promise<boolean>;

    public abstract async revoke(capability: string, identifier: string): Promise<boolean>;

    public abstract async load(address: string): Promise<void>;

    public abstract async save(options: any): Promise<ISaveResult>;

    public getCapabilities() {
        return this.capabilities;
    }

    protected async publicKeysFromDid(did: any) {
        // TODO: does not work with new DidDocument!

        console.log(did);
        console.log(this.didRegistry);

        return;

        // const doc = await resolve(did);
        // return doc.publicKey.find((entry: any) => {
        //     const id = entry.id.split('#');
        //     return id[0] === doc.id &&
        //     (id[1] === 'subSigningKey' || id[1] === 'signingKey');
        // }).publicKeyHex;
    }

}

export default AbstractAccessController;
