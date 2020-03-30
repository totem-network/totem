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
