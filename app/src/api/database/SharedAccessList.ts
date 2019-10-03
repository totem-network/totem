import AbstractAccessList from './AbstractAccessList';

class SharedAccessList extends AbstractAccessList {

    protected address: any;

    protected box: any;

    constructor(box: any) {
        super();

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
        const space = await this.getTotemSpace();

        // TODO: decryption, keys (like files) in space.public.get(`access.keys.${address}`)

        // TODO: load from moderated thread
        this.capabilities = JSON.parse(await space.public.get(`access.${address}`));

        return;
    }

    public async save(options: any) {
        const space = await this.getTotemSpace();

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

    protected async getTotemSpace() {
        return this.box.openSpace('totem');
    }

}

export default SharedAccessList;
