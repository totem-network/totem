import DatabaseProviderManager from 'api/database/ProviderManager';
import DidDocument from './DidDocument';

class PublicProfile {

    protected did: DidDocument;

    protected database: any;

    constructor(did: DidDocument) {
        this.did = did;
    }

    public async initDatabases() {
        const publicProfileService = this.did.getService(`${this.did.getId()}#publicProfile`);

        if (!publicProfileService) {
            return;
        }

        const publicPath = publicProfileService.serviceEndpoint;

        const database = await DatabaseProviderManager.openDatabase({
            accessController: {
                skipManifest: true,
                type: 'VinyaiPrivateAccess',
            },
            path: publicPath,
            network: '1',
            platform: 'ipfs',
            provider: 'orbit-db',
            type: 'keyvalue',
        });

        this.database = database;

        return true;
    }

    public get(key: string) {
        if (!this.database) {
            throw new Error('Database not set in PublicProfile');
        }

        return this.database.get(key);
    }

    public getDid() {
        return this.did;
    }

}

export default PublicProfile;
