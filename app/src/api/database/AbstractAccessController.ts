
interface ISaveResult {
    address: string;
}

export interface IAccessControllerOptions {
    administration?: any;
    read?: any;
    write?: any;
}

export interface ICapabilities {
    administration: any;
    read: any;
    write: any;
}

abstract class AbstractAccessController {
    // TODO: see https://github.com/orbitdb/orbit-db-access-controllers/blob/master/src/contract-access-controller.js

    protected capabilities: ICapabilities;

    constructor(options: IAccessControllerOptions) {
        this.capabilities = {
            administration: options.administration || [],
            read: options.read || [],
            write: options.write || [],
        };
    }

    public abstract async canAppend(entry: any, identityProvider: any): Promise<boolean>;

    public abstract async grant(capability: string, identifier: string): Promise<boolean>;

    public abstract async revoke(capability: string, identifier: string): Promise<boolean>;

    public abstract async load(address: string): Promise<void>;

    public abstract async save(options: any): Promise<ISaveResult>;

    public getCapabilities() {
        return this.capabilities;
    }

}

export default AbstractAccessController;
