import AbstractAccessController, { IAccessControllerOptions } from './AbstractAccessController';

// SharedAccessController for shared databases, stored in the public 3box profile
// multiple shared databases for groups of contacts

// basic config: one private db for all devices and keys of the profile
// and one shared db for all contacts to add their shared files to

// Maybe filter shared db for contacts for grouping? so only 1 shared db exists (only basic config)

// Metadata protection?: Shared db acl contains all public keys of contacts
// How to add a contact to public acl without revealing social graph?

class SharedAccessController extends AbstractAccessController {

    public static get type() {
        return 'VinyaiSharedAccess';
    }

    protected address: any;

    protected box: any;

    constructor(box: any, options: IAccessControllerOptions) {
        super(options);

        this.box = box;
    }

    public async canAppend(entry: any, identityProvider: any): Promise<boolean> {
        // TODO: check this.capabilities

        return false;
    }

    public async grant(capability: string, identifier: string): Promise<boolean> {
        // TODO: check this.capabilities and add to this.capabilities
        return false;
    }

    public async revoke(capability: string, identifier: string): Promise<boolean> {
        // TODO: check this.capabilities and remove from this.capabilities
        return false;
    }

    public async load(address: string): Promise<void> {
        const space = await this.getVinyaiSpace();

        // TODO: decryption, keys (like files) in space.public.get(`access.keys.${address}`)

        // TODO: load from moderated thread
        this.capabilities = JSON.parse(await space.public.get(`access.${address}`));

        return;
    }

    public async save(options: any) {
        const space = await this.getVinyaiSpace();

        let address = this.address;
        if (!address) {
            // TODO: generate new address
            address = '';
        }

        // TODO: encryption, keys (like files) in space.public.set(`access.keys.${address}`, newEncryptionKeys)
        // only calculate and store new keys if capabilities changed!

        // TODO: store in moderated thread
        await space.public.set(`access.${address}`, JSON.stringify(this.capabilities));

        return {
            address,
        };
    }

    protected async getVinyaiSpace() {
        return this.box.openSpace('vinyai');
    }

}

export default SharedAccessController;
