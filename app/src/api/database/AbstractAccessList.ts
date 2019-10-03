const resolve = require('did-resolver').default;

interface ISaveResult {
    address: string;
}

export interface ICapabilities {
    admin: any;
    read: any;
    write: any;
}

abstract class AbstractAccessList {
    // TODO: see https://github.com/orbitdb/orbit-db-access-controllers/blob/master/src/contract-access-controller.js

    protected capabilities?: ICapabilities;

    public abstract async canAppend(entry: any, identityProvider: any): Promise<boolean>;

    public abstract async grant(capability: string, identifier: string): Promise<boolean>;

    public abstract async revoke(capability: string, identifier: string): Promise<boolean>;

    public abstract async load(address: string): Promise<void>;

    public abstract async save(options: any): Promise<ISaveResult>;

    protected async publicKeyFromDID(did: any) {
        // TODO - this should look at authentication keys and get publicKey from that
        const doc = await resolve(did);
        return doc.publicKey.find((entry: any) => {
            const id = entry.id.split('#');
            return id[0] === doc.id &&
            (id[1] === 'subSigningKey' || id[1] === 'signingKey');
        }).publicKeyHex;
    }

}

export default AbstractAccessList;
