import { boxes } from 'account';
import base64url from 'base64url';
const { verifyJWT } = require('did-jwt');
const Identities = require('orbit-db-identity-provider');

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

    constructor(identity: any) {
        // TODO: identity is a IdentityWallet from 3box
        this.identity = identity;
    }

    public async getId() {
        // TODO: convert to did
        // TODO: maybe not working -> needs public key from identity
        return this.identity.getAddress();
    }

    public async signIdentity(data: any) {
        // TODO: sign with IdentityWallet.signClaim
        return this.identity.signClaim(data);
    }

}

Identities.addIdentityProvider(IdentityProvider);

export default IdentityProvider;
