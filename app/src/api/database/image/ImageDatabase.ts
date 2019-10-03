import BaseDatabase from '../BaseDatabase';

class ImageDatabase extends BaseDatabase {

    public static readonly DB_OPTIONS = {
        type: 'feed',
    };

    public async addImage(imageHash: any) {
        if (!this.database) {
            return;
        }

        return this.database.add(imageHash);
    }

    protected async onInitialize() {
        this.initDatabase('images', ImageDatabase.DB_OPTIONS);
    }

    protected async onReady() {
        //
    }

}

export default ImageDatabase;
