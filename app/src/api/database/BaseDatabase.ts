import Identity, { IFile } from 'account/identity/Identity';
import KeyRing from 'account/encryption/KeyRing';
import boxes from 'account/profile/boxes';
import { Signer } from 'ethers/abstract-signer';
import { Provider } from 'ethers/providers/abstract-provider';
import DatabaseProviderManager from './ProviderManager';
const Identities = require('orbit-db-identity-provider');

export interface IDatabaseInitializationOptions {
    accessController: any;
    type: string;
    // TODO: dbs that are not stored in vinyai space
}

// TODO: Put all orbit-db wrappers (db, index and relations) in single package @vinyai/base-db
abstract class BaseDatabase {

    readonly NO_DATABASE_ERROR = 'No database';

    readonly NO_IDENTITY_ERROR = 'No identity set in database';

    readonly NO_IPFS_ERROR = 'No ipfs in database';

    readonly NOT_READY_ERROR = 'Database not ready';

    protected chainId: string;

    protected signer: Signer;

    protected provider: Provider;

    protected identity: any;

    protected vinyaiSpace: any;

    protected database: any;

    protected ready: boolean = false;

    /********************
     * Initialization
     ********************/

    constructor(chainId: string, signer: Signer, provider: Provider) {
        this.chainId = chainId;
        this.signer = signer;
        this.provider = provider;
    }

    protected abstract async onInitialize(): Promise<void>;

    protected abstract async onReady(): Promise<void>;

    protected async init() {
        this.vinyaiSpace = await this.getVinyaiSpace();

        await this.onInitialize();
        await this.onReady();

        this.ready = true;

        return;
    }

    protected async initDatabase(name: string, options: IDatabaseInitializationOptions) {
        const databaseAddress = await this.vinyaiSpace.private.get(name);

        let database;
        if (!databaseAddress) {
            database = await DatabaseProviderManager.createDatabase({
                accessController: options.accessController,
                name,
                // TODO: network and platform from state -> not cointype! like cointype but for storage networks
                network: '1',
                platform: 'ipfs',
                provider: 'orbit-db',
                type: options.type,
                web3Provider: this.provider,
            });

            if (!database) {
                return;
            }

            await this.vinyaiSpace.private.set(name, database.id);
        } else {
            database = await DatabaseProviderManager.openDatabase({
                accessController: options.accessController,
                // TODO: network and platform from state -> not cointype! like cointype but for storage networks
                network: '1',
                path: databaseAddress,
                platform: 'ipfs',
                provider: 'orbit-db',
                type: options.type,
                web3Provider: this.provider,
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

        

        // this.identity = await Identity.create(
        //     database._ipfs,
        //     this.signer,
        // );

        // TODO: new Identity

        /*await Identities.createIdentity({
            identity: await Identity.create(database._ipfs, currentNetwork.chainId),
            type: 'VinyaiID',
        });*/

        database.setIdentity(await this.identity.getOrbitDbIdentity());

        this.database = database;

        // TODO: gets called in init() too
        await this.onReady();
    }

    protected async getVinyaiSpace() {
        const account = await this.signer.getAddress();

        const box = await boxes.openBox(
            account,
            boxes.wrapEthersSigner(this.signer),
        );

        const space = await box.openSpace('vinyai');

        return space;
    }

    /********************
     * Key Management
     *
     * Use entry permissions when you share a single file and add
     * it to another users SharedDatabase
     *
     * Use db permissions for access to the whole database
     ********************/

    protected async grantEntryRead(publicKey: string, entry: any) {
        this.throwIfNotReady();
        // TODO: Encrypt sym private key for metadata and data with publicKey
        // and add it to /keys directory
        // (this works for indiviual entries)
    }

    protected async revokeEntryRead(publicKey: string, entry: any) {
        this.throwIfNotReady();
        // TODO: remove encrypted private key from /keys where publicKey matches
        // (this works for indiviual entries)

        // TODO: forward secrecy with proxy reencryption
    }

    protected async grantEntryWrite(publicKey: string, entry: any) {
        this.throwIfNotReady();
        // TODO: Encrypt ipns private key with publicKey
        // and add it to /ipnsKeys directory
        // (this works for indiviual entries)
    }

    protected async revokeEntryWrite(publicKey: string, entry: any) {
        this.throwIfNotReady();
        // TODO: remove encrypted ipns private key from /ipnsKeys where publicKey matches
        // (this works for indiviual entries)
    }

    // TODO: key management for whole database with master key
    // master key is stored in AccessController and encrypted with each public key
    // that has access and can only be granted with admin permission
    // when master key gets revoked delete encrypted private master key for revoked public key

    // this.database.access -> Given Access Controller extends AbstractAccessController

    protected async grantRead(publicKey: string) {
        this.throwIfNotReady();
        // TODO
    }

    protected async revokeRead(publicKey: string) {
        this.throwIfNotReady();
        // TODO

        // TODO: forward secrecy with proxy reencryption
    }

    protected async grantWrite(publicKey: string) {
        this.throwIfNotReady();
        // TODO
    }

    protected async revokeWrite(publicKey: string) {
        this.throwIfNotReady();
        // TODO
    }

    /********************
     * IPFS
     ********************/

    protected async createFile(metaData: any, data: IFile[]) {
        this.throwIfNotReady();

        const ipfs = this.database._ipfs;

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
            {
                name: 'metaData',
                data: JSON.stringify(metaData),
            },
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
     * Checks
     ********************/

    protected throwIfNoDatabase() {
        if (!this.database) {
            throw new Error(this.NO_DATABASE_ERROR);
        }
    }

    protected throwIfNoIdentity() {
        if (!this.identity) {
            throw new Error(this.NO_IDENTITY_ERROR);
        }
    }

    protected throwIfNoIpfs() {
        this.throwIfNoDatabase();

        if (!this.database._ipfs) {
            throw new Error(this.NO_IPFS_ERROR);
        }
    }

    protected throwIfNotReady() {
        this.throwIfNoDatabase();
        this.throwIfNoIdentity();
        this.throwIfNoIpfs();

        if (!this.ready) {
            throw new Error(this.NOT_READY_ERROR);
        }
    }

}

export default BaseDatabase;
