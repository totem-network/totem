import { Signer } from 'ethers/abstract-signer';
import { Provider } from 'ethers/providers/abstract-provider';
import AbstractImageDatabase from './AbstractImageDatabase';

class PrivateImageDatabase extends AbstractImageDatabase {

    public static readonly DB_OPTIONS = {
        accessController: {
            skipManifest: true,
            type: 'VinyaiPrivateAccess',
        },
        type: 'feed',
    };


    public static async create(ipfs: any, signer: Signer, provider: Provider) {
        const database = new PrivateImageDatabase(ipfs, signer, provider);

        await database.init();

        return database;
    }

    /********************
     * Initialization
     ********************/

    protected async onInitialize() {
        await this.initDatabase('images', PrivateImageDatabase.DB_OPTIONS);
    }

    protected async onReady() {
        //
    }

}

export default PrivateImageDatabase;
