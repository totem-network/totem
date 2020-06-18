import DatabaseProviderManager from 'api/database/ProviderManager';
import { Provider } from 'ethers/providers/abstract-provider';
import DidDocument from './DidDocument';
import Identity from './Identity';

export interface IProfileOptions {
    name?: string;
}

class Profile {

    protected identity: Identity;

    protected publicDatabase: any;

    protected privateDatabase: any;

    public static async createProfile(didDocument: DidDocument, web3Provider: Provider): Promise<boolean> {
        const publicDatabase = await DatabaseProviderManager.createDatabase({
            accessController: {
                skipManifest: true,
                type: 'VinyaiPrivateAccess',
            },
            name: 'publicProfile',
            network: '1',
            platform: 'ipfs',
            provider: 'orbit-db',
            type: 'keyvalue',
            web3Provider,
        });

        if (!publicDatabase) {
            return false;
        }

        const privateDatabase = await DatabaseProviderManager.createDatabase({
            accessController: {
                skipManifest: true,
                type: 'VinyaiPrivateAccess',
            },
            name: 'privateProfile',
            network: '1',
            platform: 'ipfs',
            provider: 'orbit-db',
            type: 'keyvalue',
            web3Provider,
        });

        if (!privateDatabase) {
            return false;
        }

        didDocument.addService({
            id: 'publicProfile',
            serviceEndpoint: publicDatabase.id,
            type: 'PublicProfile',
        });

        didDocument.addService({
            id: 'privateProfile',
            serviceEndpoint: privateDatabase.id,
            type: 'PrivateProfile',
        });

        return true;
    }

    constructor(identity: Identity) {
        this.identity = identity;
    }

    public async initDatabases(web3Provider: Provider) {
        const did = await this.identity.getDid();

        const publicProfileService = did.getService(`${did.getId()}#publicProfile`);
        const privateProfileService = did.getService(`${did.getId()}#privateProfile`);

        if (!publicProfileService || !privateProfileService) {
            return;
        }

        const publicPath = publicProfileService.serviceEndpoint;
        const privatePath = privateProfileService.serviceEndpoint;

        const publicDatabase = await DatabaseProviderManager.openDatabase({
            accessController: {
                skipManifest: true,
                type: 'VinyaiPrivateAccess',
            },
            path: publicPath,
            network: '1',
            platform: 'ipfs',
            provider: 'orbit-db',
            type: 'keyvalue',
            web3Provider,
        });

        const privateDatabase = await DatabaseProviderManager.openDatabase({
            accessController: {
                skipManifest: true,
                type: 'VinyaiPrivateAccess',
            },
            path: privatePath,
            network: '1',
            platform: 'ipfs',
            provider: 'orbit-db',
            type: 'keyvalue',
            web3Provider,
        });

        const orbitDbIdentity = await this.identity.getOrbitDbIdentity();

        publicDatabase.setIdentity(orbitDbIdentity);
        privateDatabase.setIdentity(orbitDbIdentity);

        this.publicDatabase = publicDatabase;
        this.privateDatabase = privateDatabase;

        return true;
    }

    public async setPublic(key: string, value: string) {
        if (!this.publicDatabase) {
            throw new Error('Public database not set in Profile');
        }

        await this.publicDatabase.set(key, value);
    }

    public getPublic(key: string) {
        if (!this.publicDatabase) {
            throw new Error('Public database not set in Profile');
        }

        return this.publicDatabase.get(key);
    }

    public async setPrivate(key: string, value: string) {
        if (!this.privateDatabase) {
            throw new Error('Private database not set in Profile');
        }
    
        const encryptedValue = this.identity.encrypt([{
            data: value,
            name: key,
        }]);

        const encryptedValueJSON = JSON.stringify({
            keys: encryptedValue.keys,
            value: encryptedValue.files[0].data,
        })

        await this.privateDatabase.set(key, encryptedValueJSON);
    }

    public getPrivate(key: string) {
        if (!this.privateDatabase) {
            throw new Error('Private database not set in Profile');
        }

        const encryptedValueJSON = this.privateDatabase.get(key);

        if (!encryptedValueJSON) {
            return;
        }

        const encryptedValue = JSON.parse(encryptedValueJSON);

        const decryptedValue = this.identity.decrypt({
            files: [{
                data: encryptedValue.value,
                name: 'value',
            }],
            keys: encryptedValue.keys,
        });

        return decryptedValue[0].data;
    }

    public async reset() {
        if (!this.publicDatabase || !this.privateDatabase) {
            throw new Error('Databases not set in Profile');
        }

        await this.resetDatabase(this.publicDatabase);
        await this.resetDatabase(this.privateDatabase);
    }

    protected async resetDatabase(database: any) {
        for (const key in database.all) {
            if (database.all[key]) {
                await database.del(key);
            }
        }
    }

}

export default Profile;
