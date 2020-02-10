import AbstractIndex from '../../AbstractIndex';

class AlbumIndex extends AbstractIndex {

    // TODO: reIndex function, should be called now and then e.g. when device is loading and via wifi
    // or at home
    public async recreateIndex(): Promise<boolean> {
        //

        return true;
    }

}

export default AlbumIndex;
