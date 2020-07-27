import Identity, { IFile } from 'account/identity/Identity';
import IdentityManager from 'account/identity/IdentityManager';
import Profile from 'account/identity/Profile';
import { Signer } from 'ethers/abstract-signer';
import { Provider } from 'ethers/providers/abstract-provider';
import DatabaseProviderManager from './ProviderManager';

export interface IDatabaseInitializationOptions {
    accessController: any;
    type: string;
    // TODO: dbs that are not stored in private profile
}

// TODO: Put all orbit-db wrappers (db, index and relations) in single package @vinyai/base-db
abstract class BaseDatabase {

    readonly NO_DATABASE_ERROR = 'No database';

    readonly NO_IDENTITY_ERROR = 'No identity set in database';

    readonly NO_IPFS_ERROR = 'No ipfs in database';

    readonly NO_PROFILE_ERROR = 'No profile set in database';

    readonly NOT_READY_ERROR = 'Database not ready';

    protected ipfs: any;

    protected signer: Signer;

    protected provider: Provider;

    protected identityManager?: IdentityManager;

    protected identity?: Identity;

    protected profile?: Profile;

    protected database: any;

    protected ready: boolean = false;

    /********************
     * Initialization
     ********************/

    constructor(ipfs: any, signer: Signer, provider: Provider) {
        this.ipfs = ipfs;
        this.signer = signer;
        this.provider = provider;
    }

    protected abstract async onInitialize(): Promise<void>;

    protected abstract async onReady(): Promise<void>;

    protected async init() {
        this.identityManager = new IdentityManager(this.ipfs, this.signer, this.provider);
        this.identity = await this.identityManager.loadIdentity();

        if (!this.identity) {
            return;
        }

        this.profile = await this.identityManager.loadProfile(this.identity);

        if (!this.profile) {
            return;
        }

        await this.onInitialize();
        await this.onReady();

        this.ready = true;

        return true;
    }

    protected async initDatabase(name: string, options: IDatabaseInitializationOptions) {
        if (!this.identity) {
            throw new Error(this.NO_IDENTITY_ERROR);
        }

        if (!this.profile) {
            throw new Error(this.NO_PROFILE_ERROR);
        }

        const databaseAddress = this.profile.getPrivate(name);

        const did = this.identity.getDid().getId();

        let database;
        if (!databaseAddress) {
            database = await DatabaseProviderManager.createDatabase({
                accessController: {
                    ...options.accessController,
                    administration: [
                        did,
                    ],
                    read: [
                        did,
                    ],
                    write: [
                        did,
                    ],
                },
                name,
                // TODO: network and platform from state -> not cointype! like cointype but for storage networks
                network: '1',
                platform: 'ipfs',
                provider: 'orbit-db',
                type: options.type,
            });

            if (!database) {
                return;
            }

            await this.profile.setPrivate(name, database.id);
        } else {
            database = await DatabaseProviderManager.openDatabase({
                accessController: {
                    ...options.accessController,
                },
                // TODO: network and platform from state -> not cointype! like cointype but for storage networks
                network: '1',
                path: databaseAddress,
                platform: 'ipfs',
                provider: 'orbit-db',
                type: options.type,
            });

            // TODO: check if user is allowed to write to or read from db

            if (!database) {
                // TODO: if hash was outdated create new db, but what if only the connection stopped working?
                // -> not possible, see ProviderManager.loadDatabaseInstance and ipfs.id() async bug
                // in PrivateImageDatabase, PrivateCryptoCurrencyDatabase, ...

                return;
            }
        }

        if (!database || !database._ipfs) {
            return;
        }

        database.setIdentity(await this.identity.getOrbitDbIdentity());

        this.database = database;

        // TODO: gets called in init() too
        await this.onReady();
    }

    /********************
     * Key Management
     *
     * Use entry permissions when you share a single file and add
     * it to another users SharedDatabase
     *
     * Use db permissions for access to the whole database
     ********************/

     // TODO: Maybe Key Management in seperate db

    protected async grantEntryRead(publicKey: string, entry: any) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO: Encrypt sym private key for metadata and data with publicKey
        // and add it to /keys directory
        // (this works for indiviual entries)
    }

    protected async revokeEntryRead(publicKey: string, entry: any) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO: remove encrypted private key from /keys where publicKey matches
        // (this works for indiviual entries)

        // TODO: forward secrecy with proxy reencryption
    }

    protected async grantEntryWrite(publicKey: string, entry: any) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO: Encrypt ipns private key with publicKey
        // and add it to /ipnsKeys directory
        // (this works for indiviual entries)
    }

    protected async revokeEntryWrite(publicKey: string, entry: any) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO: remove encrypted ipns private key from /ipnsKeys where publicKey matches
        // (this works for indiviual entries)
    }

    // TODO: key management for whole database with master key
    // master key is stored in AccessController and encrypted with each public key
    // that has access and can only be granted with admin permission
    // when master key gets revoked delete encrypted private master key for revoked public key

    // this.database.access -> Given Access Controller extends AbstractAccessController

    protected async grantRead(publicKey: string) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO
    }

    protected async revokeRead(publicKey: string) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO

        // TODO: forward secrecy with proxy reencryption
    }

    protected async grantWrite(publicKey: string) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO
    }

    protected async revokeWrite(publicKey: string) {
        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
        // TODO
    }

    /********************
     * IPFS
     ********************/

    protected async createFile(metaData: any, data: IFile[]) {
        if (!this.identity) {
            throw new Error(this.NO_IDENTITY_ERROR);
        }

        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }

        const ipfs = this.ipfs;

        // TODO: capabilities must contain encryption and signing key!
        // take keys from did document of the VinyaiIDs
        // each VinyaiID must have one signing and one encryption key
        // every private key with access to the VinyaiID can decrypt the
        // private signing and private encryption key
        const capabilities = this.database.access.getCapabilities();

        // encrypt data
        const encryptedData = this.identity.encrypt(data, capabilities.read);

        // upload data and get the cids
        const dataCids: any[] = [];
        const uploadDataPromises = encryptedData.files.map((encryptedFile: IFile) => {
            const uploadDataPromise = ipfs.add(Buffer.from(encryptedFile.data));

            // TODO: must be, but needs to return the promise:
            /*for (const uploadDataPromise of this.ipfs.add(encryptedFile.data)) {
                dataCids.push({
                    name: encryptedFile.name,
                    uploadResult: uploadDataPromise,
                });
            }*/

            dataCids.push({
                name: encryptedFile.name,
                uploadResult: uploadDataPromise,
            });

            return uploadDataPromise;
        });

        await Promise.all(uploadDataPromises);

        // create metaData file with cids from data
        metaData.files = {};
        for (const dataCid of dataCids) {
            metaData.files[dataCid.name] = dataCid.cid.toString();
        }

        const encryptedMetaData = this.identity.encrypt(
            [
                {
                    name: 'metaData',
                    data: JSON.stringify(metaData),
                },
            ],
            capabilities.read,
        );

        // upload metaData and get cid

        // upload keys and get cids

        // create ipns key and upload and get cids (capabilities.write)

        // create parent and add it to ipfs (capabilities.write)

        // point ipns to root ipfs

        // ----

        // TODO: create ipfs upload with following files/directories
        // /metaData file
        // /keys/...
        // /ipnsKeys/...
        // /data/...

        // use ipfs.dag:
        // when adding a new key, create a new parent object with cids of all other files:
        /*
        {
            metaData: metaDataCid,
            keys: {
                ...keyCids,
                someHash: newKeyCid,
            },
            ipnsKeys: { ... },
            data: { ... },
        }
        */
        // same for removing keys or changing the file
        // then add the cid of the new parent to the ipns
    }

    protected async updateFile(metaData: string, data: string[]) {
        //
    }

    /********************
     * Indexes
     ********************/

    /********************
     * Relations
     ********************/

    /********************
     * Pagination
     ********************/

    protected async paginate(options?: any) {
        // TODO
    }

    protected formatPagination(options?: any) {
        return {
            edges: [],
            pageInfo: {
                hasNextPage: false,
            },
        };
    }

    /********************
     * Defragmentation
     ********************/

    // TODO: allow to defragment db but make sure entries of other users 
    // with no access to private keys are still cryptographic verifiable
    // example: put image1.png - delete image1.png / 2 entries that only waste space

    public async defragment() {
        // TODO: Create new db with only those entries that are in use
    }

}

export default BaseDatabase;
