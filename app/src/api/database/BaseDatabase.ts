import { accountAddressSelector, boxes } from 'account';
import { store } from 'state';
import DatabaseProviderManager from '../database/ProviderManager';
const Identities = require('orbit-db-identity-provider');

interface IDatabaseInitializationOptions {
    type: string;
    // TODO: dbs that are not stored in totem space
}

abstract class BaseDatabase {

    protected totemSpace: any;

    protected database: any;

    constructor() {
        this.init();
    }

    protected abstract async onInitialize(): Promise<void>;

    protected abstract async onReady(): Promise<void>;

    protected async init() {
        this.totemSpace = await this.getTotemSpace();

        this.onInitialize();
    }

    protected async getTotemSpace() {
        const state = store.getState();
        const account = accountAddressSelector(state);

        const box = await boxes.openBox(account, (window as any).ethereum);

        const space = await box.openSpace('totem');

        return space;
    }

    protected async initDatabase(name: string, options: IDatabaseInitializationOptions) {
        const databaseAddress = await this.totemSpace.private.get(name);

        let database;
        if (!databaseAddress) {
            database = await DatabaseProviderManager.createDatabase({
                name,
                // TODO: network and platform from state
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
                // TODO: network and platform from state
                network: '1',
                path: databaseAddress,
                platform: 'ipfs',
                provider: 'orbit-db',
                type: options.type,
            });

            // TODO: check if user is allowed to write to db

            if (!database) {
                // TODO: if hash was outdated create new db

                return;
            }
        }

        if (!database) {
            return;
        }

        const identity = Identities.createIdentity({
            type: 'TotemID',
            // TODO: Identity Wallet and maybe box instance
        });

        database.setIdentity(identity);

        this.database = database;

        this.onReady();
    }

}

export default BaseDatabase;
