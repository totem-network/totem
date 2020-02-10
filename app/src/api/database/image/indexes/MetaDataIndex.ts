import AbstractIndex from '../../AbstractIndex';

// Index for metadata like, camera model, date, 5-star rating, gps, ...
// TODO: maybe some can be own Index like 5-star or gps?
class MetaDataIndex extends AbstractIndex {

    // TODO: reIndex function, should be called now and then e.g. when device is loading and via wifi
    // or at home
    public async recreateIndex(): Promise<boolean> {
        //

        return true;
    }

}

export default MetaDataIndex;
