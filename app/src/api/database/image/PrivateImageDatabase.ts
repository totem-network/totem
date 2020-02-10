import AbstractImageDatabase from './AbstractImageDatabase';

class PrivateImageDatabase extends AbstractImageDatabase {

    public static readonly DB_OPTIONS = {
        accessController: {
            skipManifest: true,
            type: 'TotemPrivateAccess',
        },
        type: 'feed',
    };

    public static async create() {
        const database = new PrivateImageDatabase();

        await database.init();

        // TODO: fix for ipfs.id() async bug
        const sleep = (ms: any) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
        };
        await sleep(5000);

        return database;
    }

    /********************
     * Initialization
     ********************/

    protected async onInitialize() {
        this.initDatabase('images', PrivateImageDatabase.DB_OPTIONS);
    }

    protected async onReady() {
        //
    }

}

export default PrivateImageDatabase;
