import Identity from 'account/identity/Identity';
import base64url from 'base64url';
const { verifyJWT } = require('did-jwt');

const encodeSection = (data: any) => base64url.encode(JSON.stringify(data));

const JWT_HEADER = encodeSection({ typ: 'JWT', alg: 'ES256K' });

class IdentityProvider {

    public static get type() {
        return 'VinyaiID';
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

        console.log(signedPayload);

        return signedPayload.split('.')[2];
    }

}

export default IdentityProvider;
