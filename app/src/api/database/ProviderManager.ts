import { StorageProviderManager } from 'network';
// import OrbitDB from 'orbit-db';
import IdentityProvider from './IdentityProvider';
import registerTotemID from './IdentityResolver';
import PrivateAccessController from './PrivateAccessController';
const OrbitDB = require('orbit-db');
const AccessControllers = require('orbit-db-access-controllers');
const Identities = require('orbit-db-identity-provider');

// TODO: not required in the future
const Log = require('ipfs-log');

Identities.addIdentityProvider(IdentityProvider);
AccessControllers.addAccessController({ AccessController: PrivateAccessController });

interface IProvider {
    [key: string]: any;
}

interface IProviderNetworks {
    [key: string]: IDatabaseProvider;
}

interface IProviders {
    [key: string]: IProviderNetworks;
}

interface IDatabase {
    [key: string]: any;
}

interface IDatabaseProvider {
    [key: string]: IDatabase;
}

interface IDatabases {
    [key: string]: IProviderNetworks;
}

interface IDatabaseProviderOptions {
    network: string;
    platform: string;
    provider: string;
}

interface ICreateDatabaseOptions {
    accessController?: any;
    name: string;
    network: string;
    platform: string;
    provider: string;
    type: string;
    options?: any;
}

interface IOpenDatabaseOptions {
    accessController?: any;
    path: string;
    network: string;
    platform: string;
    provider: string;
    type: string;
    options?: any;
}

class ProviderManager {

    protected providers: IProviders;

    protected databases: IDatabases;

    constructor() {
        this.providers = {};
        this.databases = {};

        this.createDatabase = this.createDatabase.bind(this);
        this.openDatabase = this.openDatabase.bind(this);
    }

    public async createDatabase(options: ICreateDatabaseOptions) {
        if (!this.providers[options.platform]) {
            this.providers[options.platform] = {};
        }

        if (!this.providers[options.platform][options.network]) {
            this.providers[options.platform][options.network] = {};
        }

        if (!this.providers[options.platform][options.network][options.provider]) {
            this.providers[options.platform][options.network][options.provider]
                = await this.createDatabaseProvider({
                    network: options.network,
                    platform: options.platform,
                    provider: options.provider,
                });

            if (!this.providers[options.platform][options.network][options.provider]) {
                return;
            }
        }

        if (!this.databases[options.platform]) {
            this.databases[options.platform] = {};
        }

        if (!this.databases[options.platform][options.network]) {
            this.databases[options.platform][options.network] = {};
        }

        if (!this.databases[options.platform][options.network][options.provider]) {
            this.databases[options.platform][options.network][options.provider] = {};
        }

        const database = await this.createDatabaseInstance(options);

        if (!database || !database.id) {
            return;
        }

        this.databases[options.platform][options.network][options.provider][database.id] = database;

        return database;
    }

    public async openDatabase(options: IOpenDatabaseOptions): Promise<any | undefined> {
        if (!this.providers[options.platform]) {
            this.providers[options.platform] = {};
        }

        if (!this.providers[options.platform][options.network]) {
            this.providers[options.platform][options.network] = {};
        }

        if (!this.providers[options.platform][options.network][options.provider]) {
            this.providers[options.platform][options.network][options.provider]
                = await this.createDatabaseProvider({
                    network: options.network,
                    platform: options.platform,
                    provider: options.provider,
                });

            if (!this.providers[options.platform][options.network][options.provider]) {
                return;
            }
        }

        if (!this.databases[options.platform]) {
            this.databases[options.platform] = {};
        }

        if (!this.databases[options.platform][options.network]) {
            this.databases[options.platform][options.network] = {};
        }

        if (!this.databases[options.platform][options.network][options.provider]) {
            this.databases[options.platform][options.network][options.provider] = {};
        }

        if (!this.databases[options.platform][options.network][options.provider][options.path]) {
            this.databases[options.platform][options.network][options.provider][options.path]
                = await this.loadDatabaseInstance(options);
        }

        return this.databases[options.platform][options.network][options.provider][options.path];
    }

    protected async createDatabaseProvider(options: IDatabaseProviderOptions): Promise<any | undefined> {
        if (options.provider === 'orbit-db') {
            const ipfs = await StorageProviderManager.getProvider(options.platform, options.network);

            registerTotemID(ipfs, { pin: true });

            // TODO: does not handle await correctly with version 0.21.5/0.36.4!
            // -> issue with async ipfs.id(), fixed in 0.38
            // TODO: give identity via options as second parameter and other options,
            // identity is also given in BaseDatabase
            return OrbitDB.createInstance(ipfs);
        }

        return;
    }

    protected async createDatabaseInstance(options: ICreateDatabaseOptions): Promise<any | undefined> {
        if (!this.providers[options.platform] ||
            !this.providers[options.platform][options.network] ||
            !this.providers[options.platform][options.network][options.provider]
            ) {
            return;
        }

        const provider = this.providers[options.platform][options.network][options.provider];

        if (options.provider === 'orbit-db') {
            if (!provider[options.type]) {
                return;
            }

            const ipfs = await StorageProviderManager.getProvider(options.platform, options.network);

            return provider[options.type](
                options.name,
                {
                    accessController: {
                        skipManifest: true,
                        type: 'TotemPrivateAccess',
                        // TODO: write: [...publicKeys]
                    },
                    // TODO: this option is required now but will likely not be in the future.
                    sortFn: Log.Sorting.SortByEntryHash,
                    syncLocal: true,
                    ...options.options,
                },
            );
        }

        return;
    }

    protected async loadDatabaseInstance(options: IOpenDatabaseOptions): Promise<any | undefined> {
        if (!this.providers[options.platform] ||
            !this.providers[options.platform][options.network] ||
            !this.providers[options.platform][options.network][options.provider]
            ) {
            return;
        }

        const provider = this.providers[options.platform][options.network][options.provider];

        if (options.provider === 'orbit-db') {
            if (!provider[options.type]) {
                return;
            }

            const database = await provider[options.type](options.path, {
                accessController: options.accessController,
            });

            await database.load();

            return database;
        }

        return;
    }

}

export default new ProviderManager();
