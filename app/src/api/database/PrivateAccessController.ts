/**
 * Based on the code of https://github.com/3box/orbit-db-access-controllers
 * Licensed under MIT License with copyright belonging to 3box and their contributors
 */

import io from 'orbit-db-io';
import AbstractAccessController from './AbstractAccessController';

class PrivateAccessController extends AbstractAccessController {

    public static get type() {
        return 'TotemPrivateAccess';
    }

    public static async create(orbitdb: any, options: any = {}) {
        return new PrivateAccessController(orbitdb._ipfs, options);
    }

    protected ipfs: any;

    protected write: any;

    constructor(ipfs: any, options: any) {
        super();

        this.ipfs = ipfs;
        this.write = options.write || [];
    }

    public async canAppend(entry: any, identityProvider: any) {
        const publicKey = await this.publicKeyFromDID(entry.identity.id);

        // TODO: no 3box when generating priv keys with signed message (Identity.ts)
        /*if (!this.box.isAddressLinked({
            address: publicKey,
        })) {
            return false;
        }*/

        console.log(entry);

        // return identityProvider.verifyIdentity(entry.identity);
        return true;
    }

    public async grant(capability: string, identifier: string): Promise<boolean> {
        // is handled via 3box linked addresses
        // TODO: not handled when generating priv keys with signed message (Identity.ts)
        // see https://github.com/3box/3box-js/blob/develop/src/3box.js - linkAddress
        return false;
    }

    public async revoke(capability: string, identifier: string): Promise<boolean> {
        // is handled via 3box linked addresses
        // TODO: not handled when generating priv keys with signed message (Identity.ts)
        // see https://github.com/3box/3box-js/blob/develop/src/3box.js - removeLinkedAddress
        return false;
    }

    public async load(address: string): Promise<void> {
        if (address.indexOf('/ipfs') === 0) {
            address = address.split('/')[2];
        }

        try {
            const access = await io.read(this.ipfs, address);
            this.write = access.write;
        } catch (e) {
            console.log('LegacyIPFS3BoxAccessController.load ERROR:', e);
        }
    }

    public async save(options: any) {
        let cid = '';
        const access = {
            admin: [],
            read: [],
            write: this.write,
        };

        try {
            cid = await io.write(
                this.ipfs, 'raw',
                Buffer.from(JSON.stringify(access, null, 2)),
                { format: 'dag-pb' },
            );
        } catch (e) {
            console.log('LegacyIPFS3BoxAccessController.save ERROR:', e);
        }

        return {
            address: cid,
            skipManifest: true,
        };
    }

}

export default PrivateAccessController;
