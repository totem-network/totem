import { accountAddressSelector, boxes } from 'account';
import { store } from 'state';
import { getCurrentNetwork, getCurrentNetworkSigner } from 'utils/blockchain';
import Identity from './Identity';
import DatabaseProviderManager from './ProviderManager';
const Identities = require('orbit-db-identity-provider');

interface IDatabaseInitializationOptions {
    accessController: any;
    type: string;
    // TODO: dbs that are not stored in totem space
}

// TODO: Put all orbit-db wrappers (db, index and relations) in single package @totem/base-db
abstract class BaseDatabase {

    protected NO_DATABASE_ERROR = 'No database';

    protected NO_IDENTITY_ERROR = 'No identity set in database';

    protected NO_IPFS_ERROR = 'No ipfs in database';

    protected NOT_READY_ERROR = 'Database not ready';

    protected identity: any;

    protected totemSpace: any;

    protected database: any;

    protected ready: boolean = false;

    /********************
     * Initialization
     ********************/

    protected abstract async onInitialize(): Promise<void>;

    protected abstract async onReady(): Promise<void>;

    protected async init() {
        this.totemSpace = await this.getTotemSpace();

        await this.onInitialize();
        await this.onReady();

        this.ready = true;

        return;
    }

    protected async initDatabase(name: string, options: IDatabaseInitializationOptions) {
        const databaseAddress = await this.totemSpace.private.get(name);

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
            });

            if (!database) {
                return;
            }

            await this.totemSpace.private.set(name, database.id);
        } else {
            database = await DatabaseProviderManager.openDatabase({
                accessController: options.accessController,
                // TODO: network and platform from state -> not cointype! like cointype but for storage networks
                network: '1',
                path: databaseAddress,
                platform: 'ipfs',
                provider: 'orbit-db',
                type: options.type,
            });

            // TODO: check if user is allowed to write to db

            if (!database) {
                // TODO: if hash was outdated create new db
                // -> not possible, see ProviderManager.loadDatabaseInstance and ipfs.id() async bug
                // in PrivateImageDatabase, PrivateCryptoCurrencyDatabase, ...

                return;
            }
        }

        if (!database || !database._ipfs) {
            return;
        }

        // TODO: current ethereum signer not other signers!
        const currentNetwork = await getCurrentNetwork();

        this.identity = await Identity.create(database._ipfs, currentNetwork.coinType);
        /*await Identities.createIdentity({
            identity: await Identity.create(database._ipfs, currentNetwork.coinType),
            type: 'TotemID',
        });*/

        database.setIdentity(await this.identity.getOrbitDbIdentity());

        this.database = database;

        this.onReady();
    }

    protected async getTotemSpace() {
        const state = store.getState();
        const account = accountAddressSelector(state);

        // TODO: current ethereum signer not other signers!
        const currentSigner = await getCurrentNetworkSigner();

        const box = await boxes.openBox(
            account,
            boxes.wrapEthersSigner(currentSigner),
        );

        const space = await box.openSpace('totem');

        return space;
    }

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
