/**
 * Based on the code of https://github.com/3box/orbit-db-access-controllers
 * Licensed under MIT License with copyright belonging to 3box and their contributors
 */

import Identity from 'account/identity/Identity';
import base64url from 'base64url';
import { verifyJWT } from 'did-jwt';
import { Resolver } from 'did-resolver';
//const { verifyJWT } = require('did-jwt');

const encodeSection = (data: any) => base64url.encode(JSON.stringify(data));

const JWT_HEADER = encodeSection({ typ: 'JWT', alg: 'ES256K' });

class IdentityProvider {

    protected static resolver: any;

    public static get type() {
        return 'VinyaiID';
    }

    public static setResolver(resolver: Resolver) {
        this.resolver = resolver;
    }

    public static async verifyIdentity(identity: any) {
        if (!this.resolver) {
            throw new Error('Set a resolver for the IdentityProvider');
        }

        // TODO: encoded payload produces different jwt than in identity.sign, header and public key are fine
        // This outputs the same when iat comes before data, maybe publicKeyHex is in wrong format
        const payload = encodeSection({
            iat: null,
            data: identity.publicKey + identity.signatures.id,
            iss: identity.id,
        });

        const jwt = `${JWT_HEADER}.${payload}.${identity.signatures.publicKey}`;

        try {
            await verifyJWT(jwt, {
                auth: true,
                resolver: this.resolver,
            });
        } catch (e) {
            // TODO: error for sentry
            return false;
        }

        return true;
    }

    protected identity: Identity;

    constructor({ identity }: any) {
        this.identity = identity;
    }

    public async getId() {
        return (await this.identity.getDid()).getId();
    }

    public async signIdentity(data: any) {
        const payload = {
            data,
            iat: null,
        };

        const signedPayload = await this.identity.sign(payload, {});

        return signedPayload.split('.')[2];
    }

}

export default IdentityProvider;
