import AbstractAccessList from './AbstractAccessList';

class PrivateAccessList extends AbstractAccessList {

    protected box: any;

    constructor(box: any) {
        super();

        this.box = box;
    }

    public async canAppend(entry: any, identityProvider: any) {
        const publicKey = (entry.v === 0) ? entry.key : await this.publicKeyFromDID(entry.identity.id);

        if (!this.box.isAddressLinked({
            address: publicKey,
        })) {
            return false;
        }

        return (entry.v === 0) ? true : identityProvider.verifyIdentity(entry.identity);
    }

    public async grant(capability: string, identifier: string): Promise<boolean> {
        // is handled via 3box linked addresses
        return false;
    }

    public async revoke(capability: string, identifier: string): Promise<boolean> {
        // is handled via 3box linked addresses
        return false;
    }

    public async load(address: string): Promise<void> {
        // is handled via 3box linked addresses
        return;
    }

    public async save(options: any) {
        // is handled via 3box linked addresses
        return {
            address: await this.publicKeyFromDID(this.box.DID),
        };
    }

}

export default PrivateAccessList;
