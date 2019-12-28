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

abstract class BaseDatabase {

    protected identity: any;

    protected totemSpace: any;

    protected database: any;

    protected abstract async onInitialize(): Promise<void>;

    protected abstract async onReady(): Promise<void>;

    protected async init() {
        this.totemSpace = await this.getTotemSpace();

        await this.onInitialize();
        await this.onReady();

        return;
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

}

export default BaseDatabase;
