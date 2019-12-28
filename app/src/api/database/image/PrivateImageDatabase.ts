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

    // TODO: move to parent class
    public async addImage(imageHash: any) {
        if (!this.database) {
            return;
        }

        return this.database.add(imageHash);
    }

    // TODO: move to parent class
    public async getImages() {
        if (!this.database) {
            return;
        }

        const all = this.database.iterator({ limit: -1 })
            .collect();
            // .map((e: any) => alert(e.payload.value));

        return all;
    }

    protected async onInitialize() {
        this.initDatabase('images', PrivateImageDatabase.DB_OPTIONS);
    }

    protected async onReady() {
        //
    }

}

export default PrivateImageDatabase;
