/**
 * Based on the code of https://github.com/3box/orbit-db-access-controllers
 * Licensed under MIT License with copyright belonging to 3box and their contributors
 */

import io from 'orbit-db-io';
import AbstractAccessController, { IAccessControllerOptions } from './AbstractAccessController';

class PrivateAccessController extends AbstractAccessController {

    public static get type() {
        return 'VinyaiPrivateAccess';
    }

    public static async create(orbitdb: any, options: IAccessControllerOptions) {
        return new PrivateAccessController(orbitdb._ipfs, options);
    }

    protected ipfs: any;

    constructor(ipfs: any, options: IAccessControllerOptions) {
        super(options);

        this.ipfs = ipfs;
    }

    public async canAppend(entry: any, identityProvider: any) {
        if (this.capabilities.write.includes(entry.identity.id)) {
            return identityProvider.verifyIdentity(entry.identity);
        }

        return false;
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
            this.capabilities = await io.read(this.ipfs, address);
        } catch (e) {
            console.log('LegacyIPFS3BoxAccessController.load ERROR:', e);
        }
    }

    public async save(options: any) {
        let cid = '';

        try {
            cid = await io.write(
                this.ipfs,
                'raw',
                Buffer.from(JSON.stringify(this.capabilities, null, 2)),
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
