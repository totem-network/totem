import AccessList from './AbstractAccessList';

class AccessController {

    public static get type() {
        return 'TotemAccess';
    }

    public static async create(orbitdb: any, options: any = {}) {
        if (!options.accessList) {
            throw new Error('AccessList not defined in AccessController::create');
        }

        return new AccessController(orbitdb._ipfs, options);
    }

    protected ipfs: any;

    protected accessList: AccessList;

    constructor(ipfs: any, options: any) {
        this.ipfs = ipfs;
        this.accessList = options.accessList;
    }

    /*if (this._db) {
        const capabilities = this._db.index

        const toSet = (e) => {
        const key = e[0]
        capabilities[key] = new Set([...(capabilities[key] || []), ...e[1]])
        }

        // Merge with the access controller of the database
        // and make sure all values are Sets
        Object.entries({
        ...capabilities,
        // Add the root access controller's 'write' access list
        // as admins on this controller
        ...{ admin: new Set([...(capabilities.admin || []), ...this._db.access.write]) }
        }).forEach(toSet)

        return capabilities;
    }*/

    public async canAppend(entry: any, identityProvider: any): Promise<boolean> {
        return this.accessList.canAppend(entry, identityProvider);
    }

    public async grant(capability: string, identifier: string): Promise<boolean> {
        return this.accessList.grant(capability, identifier);
    }

    public async revoke(capability: string, identifier: string): Promise<boolean> {
        return this.accessList.revoke(capability, identifier);
    }

    public async load(address: string) {
        return this.accessList.load(address);
    }

    public async save(options: any) {
        return this.accessList.save(options);
    }

}

export default AccessController;
