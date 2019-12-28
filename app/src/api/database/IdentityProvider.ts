/**
 * Based on the code of https://github.com/3box/orbit-db-access-controllers
 * Licensed under MIT License with copyright belonging to 3box and their contributors
 */

import { boxes } from 'account';
import base64url from 'base64url';
const { verifyJWT } = require('did-jwt');

const encodeSection = (data: any) => base64url.encode(JSON.stringify(data));

const JWT_HEADER = encodeSection({ typ: 'JWT', alg: 'ES256K' });

class IdentityProvider {

    public static get type() {
        return 'TotemID';
    }

    public static async verifyIdentity(identity: any) {
        const payload = encodeSection({
            data: identity.publicKey + identity.signatures.id,
            iat: null,
            iss: identity.id,
        });

        const jwt = `${JWT_HEADER}.${payload}.${identity.signatures.publicKey}`;

        try {
            await verifyJWT(jwt, { auth: true });
        } catch (e) {
            return false;
        }

        return true;
    }

    protected identity: any;

    constructor({ identity }: any) {
        this.identity = identity;
    }

    public async getId() {
        return this.identity.getDID();
    }

    public async signIdentity(data: any) {
        const payload = {
            data,
            iat: null,
        };

        return (await this.identity.sign(payload)).split('.')[2];
    }

}

export default IdentityProvider;
